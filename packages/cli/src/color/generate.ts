/**
 * Generates a color palette configuration files along with
 * a copy of the color type definitions from `./color.ts`.
 */

import { writeFile } from 'fs/promises'
import { join } from 'path'
import { format } from 'prettier'
import yargs from 'yargs'

import { GENERATED_BANNER } from '../const'
import { handleBuildError, NormalizedOptions, normalizeOptions, parseFile } from '../utils'

import { ColorOptions } from './options'
import { parseColorConfig } from './parse'
import { ColorConfig, ColorConfigInput } from './types'

const createTemplate = async (options: NormalizedOptions<ColorOptions>, config: ColorConfig) => {
  return `${GENERATED_BANNER}\n\n
    import { PaletteColor, PaletteColors, VariantColors } from './${options.typesFileName}'

    ${stringifyBaseColors(config)}

    ${stringifyPaletteColors(config)}

    ${stringifyVariantColors(config)}
  `
}

const stringifyBaseColors = (config: ColorConfig): string => {
  return Object.entries(config.base).reduce((str, [colorName, colorConfig]) => {
    str += `export const ${colorName}: PaletteColor = ${JSON.stringify(colorConfig, null, 2)}\n\n`

    return str
  }, '')
}

/**
 * @name buildPalette
 * @description
 * Takes the configuration of a color hue and creates a named export containing a generated set of tints.
 *
 * @param config - The hue configuration from either the `config.ts` file.
 */
const stringifyPaletteColors = (config: ColorConfig): string => {
  let tmpt = `export const palette: PaletteColors = {\n`

  Object.entries(config.palette).forEach(([colorName, colorConfig]) => {
    tmpt += `  ${colorName}: ${JSON.stringify(colorConfig, null, 2)},\n`
  })

  tmpt += '}\n\n'

  return tmpt
}

const stringifyVariantColors = (config: ColorConfig) => {
  let tmpt = `export const variants: VariantColors = {\n`

  Object.entries(config.variants).forEach(([variant, colorKey]) => {
    tmpt += `  ${variant}: palette.${colorKey},\n`
  })

  tmpt += '}\n\n'

  return tmpt
}

/**
 * @name copyTypes
 * @description
 * Generate type definitions that mirror those in 'types.ts',
 * but are specific to values in the configuration.
 */
const copyTypes = async (
  options: NormalizedOptions<ColorOptions>,
  config: ColorConfig,
): Promise<void> => {
  try {
    const { outDir, prettier, typesFileName } = options
    const { palette, tints, variants } = config

    const contents = `export const paletteColorKeys = ${Object.keys(palette)} as const
export type PaletteColorKey = typeof colorPaletteKeys[number]

export interface PaletteColor {
  title: string
  value: string
}

export const colorTintKeys = ${tints} as const
export type ColorTintKey = typeof colorTintKeys[number]
export type ColorTints = Record<ColorTintKey, PaletteColor>

export type PaletteColors = Record<PaletteColorKey, ColorTints>

export const variantColorKeys = ${Object.keys(variants)} as const
export type VariantColorKey = typeof variantColorKeys[number]
export type VariantColors = Record<VariantColorKey, ColorTints>
`
    const filepath = join(outDir, typesFileName)

    writeFile(filepath, format(contents, { filepath, ...(prettier as string[]) }))
  } catch (error) {
    handleBuildError('Could not write color types file', error)
  }
}

/**
 * @name generate
 * @description
 * The command that is called by the npm script.
 * Passed options are taken from `process.argv`.
 */
export const generate = async (yargsOptions: yargs.Arguments<ColorOptions>): Promise<void> => {
  try {
    const options = await normalizeOptions<ColorOptions>(yargsOptions)

    let configInput: ColorConfigInput = await parseFile(join(__dirname, 'config.json'))

    if (typeof options.config === 'string') {
      const customConfig = await parseFile(options.config)

      configInput = Object.assign(configInput, customConfig)
    }

    const config = parseColorConfig(configInput)

    const tmpl = await createTemplate(options, config)

    const filepath = join(options.outDir, options.fileName)

    copyTypes(options, config)

    writeFile(filepath, format(tmpl, { filepath, ...(options.prettier as string[]) }))
  } catch (error) {
    handleBuildError('Could not write file', error)
  }
}
