import { PathLike } from 'fs'
import { readFile, rmdir, writeFile } from 'fs/promises'
import { join, relative, resolve } from 'path'
import { promisify } from 'util'
import svgr from '@svgr/core'
import glob from 'glob'
import { camelCase, isNil } from 'lodash'
import { format } from 'prettier'
import { SVGProps } from 'react'

import yargs from 'yargs'
import { NumberProp, pascalize } from '../../../core/src'

import { GENERATED_BANNER } from '../const'
import { logger } from '../logger'
import { handleBuildError, normalizeOptions, resolveDir, sortFilesImports } from '../utils'
import { IconsOptions } from './options'

const globAsync = promisify(glob)

export const setProps = (props: Partial<SVGProps<any>> = {}): string => {
  const entries = Object.entries(props).filter(([_k, v]) => !isNil(v))

  if (!entries.length) {
    return 'props'
  }

  return entries.reduce((propStr, [prop, value], i) => {
    propStr += `${prop} = ${value}, `

    if (i === entries.length - 1) {
      propStr += '...props }'
    }

    return propStr
  }, '{ ')
}

export const setComputedProps = (props: Record<string, any> = {}): string => {
  const entries = Object.entries(props)

  if (!entries.length) {
    return ''
  }

  return entries.reduce((acc, [prop, value], i) => {
    const ln = i === entries.length - 1 ? '\n\n' : '\n'

    acc += `  const ${prop} = ${value};${ln}`

    return acc
  }, '')
}

interface ReturnIconType {
  code: string
  componentName: string
  name: string
  relativePath: PathLike
  sourcePath: PathLike
  targetPath: PathLike
}

export async function readIcon(
  filePath: string,
  args: IconsOptions<string>,
): Promise<ReturnIconType> {
  const { filePrefix, fileSuffix, outDir, prettier, config, srcDir } = args
  const relativePath = relative(srcDir as string, filePath)
  const nameSegments = relativePath.split('/')

  // Last part of path will be the file name (with extension).
  const filename = nameSegments.pop()

  if (!filename) throw new Error('no filename')

  // Extract any name parts from the file name and add back to the path segments.
  // e.g., "arrow-up.svg" => "arrow-up"
  nameSegments.push(...filename.split('.').slice(0, -1))

  const name = nameSegments.join('-')

  // If `filePrefix` is "example" and `fileSuffix` is "icon" then we get "example-clock-icon"
  const hypenatedName = [filePrefix, name, fileSuffix].filter((str) => !!str.length).join('-')
  // Component names are pascal-cased, so we get "ExampleClockIcon"
  const componentName = pascalize(hypenatedName)

  const contents = await readFile(filePath)

  const svgrJsx = await svgr(contents.toString(), config, { componentName })
  const targetPath = resolve(outDir, `${componentName}.tsx`)

  // We want to use destructured props in order to set some default values.
  const destructuredProps = {} as Partial<SVGProps<any>>
  const computedProps: Record<string, any> = {}

  const exportsRE = new RegExp(`export default ${componentName}`, 'g')
  const exportsReplacement = [
    `${componentName}.displayName = "${componentName}";\n`,
    `export { ${componentName} };`,
    `export default ${componentName}`,
  ].join('\n')

  const code = format(
    [
      GENERATED_BANNER,
      svgrJsx
        // Remove unnecessary, old-school globbing of default export
        .replace('* as React', 'React')
        // We want access to some of the original values set on the SVG,
        // but we want them as default props.
        .replace(
          /(width|height)=["|{](.+?)["|}]/g,
          (_match: any, p1: NumberProp, p2: NumberProp) => {
            destructuredProps[p1] = p2

            return `${p1}={${p1}}`
          },
        )
        // Set the color set as a `fill` or `stroke` value and set it as a prop.
        .replace(
          /(fill|stroke)="(#[0-9a-f]{6}|\w+)"/gi,
          (_match: any, p1: NumberProp, p2: NumberProp) => {
            if (p2 !== 'none') {
              if (!('color' in destructuredProps)) {
                destructuredProps.color = `'${p2}'`
              }

              return `${p1}={color}`
            }

            return _match
          },
        )
        // Icons using strokes need to be able to recalculate their width based upon
        // the width of the icon, otherwise they could look too thin or too thick.
        .replace(
          /(strokeWidth)=["|{](.+?)["|}]/g,
          (_match: any, p1: NumberProp, p2: NumberProp) => {
            destructuredProps[p1] = p2

            if ('width' in destructuredProps) {
              computedProps.viewBoxWidth = destructuredProps.width
              computedProps.computedStrokeWidth = `+width !== +viewBoxWidth ? (+strokeWidth / +width) * +width : +strokeWidth`

              return `${p1}={computedStrokeWidth}`
            }

            return `${p1}={${p1}}`
          },
        )
        // Avoid `ref`-related TS warning by correctly applying types to `forwardRef`.
        .replace(
          `function ${componentName}(props: SvgProps) {\n`,
          `const ${componentName} = React.forwardRef<React.Component<SvgProps>, SvgProps>((${setProps(
            destructuredProps,
          )}, ref) => {\n${setComputedProps(computedProps)}`,
        )
        // We don't want `SvgProps` to match, so set a boundary on the regexp.
        .replace(/(<Svg)\b/g, (_match, p1: string) => `${p1} ref={ref}`)
        // Replace any hex colors with `props.color`
        // Reset the closing bracket since `forwardRef` wraps the component as a callback now
        .replace(/^\}$/gm, '});')
        // Instead of just a default export, we want a named export as well as set a static
        // `displayName` on the component function.
        .replace(exportsRE, exportsReplacement),
    ].join('\n\n'),
    {
      ...(prettier ? { prettier } : {}),
      filepath: targetPath,
    },
  )

  return {
    code,
    componentName,
    name,
    relativePath,
    sourcePath: filePath,
    targetPath,
  }
}

async function writeIcon(file: any) {
  await writeFile(file.targetPath, file.code)
}

const writeIndex = async (files: any[], args: yargs.Arguments<IconsOptions>) => {
  const { fileName, outDir, prettier } = args

  logger.log('Generating icons...', outDir)

  // Generate imports of all icon components.
  const iconImports = files
    .map(({ componentName }) => `import { ${componentName} } from './${componentName}';`)
    .join('\n')

  // Create a TS `const` type for easy iteration and validation of registered icons.
  const iconNames = `export const iconNames = [\n${files
    .map(({ name }) => `"${camelCase(name)}"`)
    .join(',')}] as const;`

  // Create a union type of names for better type validation of registered icons.
  const iconsType = `export type IconSymbol = \n${files
    .map(({ name }) => `| '${name}'`)
    .join('\n')};`

  // Named exports of icon components (i.e., `export { SearchIcon, UserIcon, ... };`).
  const iconExports = `export {${files.map((f) => f.componentName).join(',')}}`

  // Export of icon components as array with aliased names for easy access.
  const defaultExport = `export const icons = {${files
    .map(({ name, componentName }) => `'${camelCase(name)}': ${componentName}`)
    .join(',')}}`

  const indexPath = resolve(outDir, fileName)

  // Format the code to be written with Prettier.
  const indexTsCode = format(
    [GENERATED_BANNER, iconImports, iconNames, iconsType, iconExports, defaultExport].join('\n\n'),
    {
      ...(prettier ? { prettier } : {}),
      filepath: indexPath,
    },
  )

  writeFile(indexPath, indexTsCode)
}

/**
 * @name generate
 * @description
 * The command that is called by the npm script.
 * Passed options are taken from `process.argv`.
 */
export const generate = async (yargsOptions: yargs.Arguments<IconsOptions>): Promise<void> => {
  const options = await normalizeOptions<IconsOptions>(yargsOptions)

  const { outDir, srcDir } = options

  try {
    // Clean the directory and create it if it doesn't exist.
    await rmdir(outDir, { recursive: true })

    await resolveDir(outDir)

    const filePaths = (await globAsync(join(srcDir as string, '**/*.svg'))) as any[]
    const files = await Promise.all(filePaths.map((fp) => readIcon(fp, yargsOptions)))

    sortFilesImports(files)

    await Promise.all(files.map(writeIcon))

    await writeIndex(files, yargsOptions)
  } catch (error) {
    handleBuildError('Could not write file', error)
  }
}
