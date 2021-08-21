import { writeFile } from 'fs/promises'
import { join, resolve } from 'path'
import esbuild from 'esbuild'
import { globby } from 'globby'

import pkg from '../package.json'

import { BASE_PATH, BIN_PATH } from './const'
import { logger } from './logger'
import { BuilderOptions } from './types'
import { handleBuildError, resolveDir } from './utils'

async function _findEntryPoints(root: string) {
  const files = await globby([resolve(root, `**/*.ts`), resolve(root, `**/*.tsx`)])

  return files.filter((file) => {
    return (
      !file.endsWith('.stories.tsx') && !file.endsWith('.test.ts') && !file.endsWith('.test.tsx')
    )
  })
}

async function generateConfig(args: BuilderOptions): Promise<esbuild.BuildOptions> {
  // eslint-disable-next-line prefer-const
  let { entryPoints, format, outdir, root, ...rest } = args

  if (!entryPoints) {
    entryPoints = await _findEntryPoints(root)
  }

  if (!outdir && !rest.outfile) {
    logger.warn('generateConfig', 'no outdir specified', outdir, entryPoints, rest)

    return undefined
  }

  return {
    format: format as esbuild.Format,
    target: 'esnext',
    platform: 'node',
    bundle: true,
    outdir,
    sourcemap: false,
    loader: { '.js': 'jsx' },
    entryPoints,
    external: Object.keys(pkg.dependencies),
    ...rest,
  }
}

export async function build(args: BuilderOptions): Promise<void | esbuild.BuildResult> {
  const options = await generateConfig(args)

  return esbuild.build(options)
}

/**
 * Build all formats via configuration.
 *
 * @example
 * await buildAll(
 *   {
 *     cjs: {
 *       outdir: 'dist/commonjs',
 *       target: 'es2015'
 *     }
 *     esm: {
 *       outdir: 'dist/module',
 *       target: 'es2015'
 *     }
 *   }`
 */
export async function buildAll(
  formatArgs: Record<string, BuilderOptions>,
): Promise<(void | esbuild.BuildResult)[]> {
  const promises = Object.entries(formatArgs).map(async ([formatType, args]) => {
    return build({ format: formatType as esbuild.Format, ...args })
  })

  return Promise.all(promises)
}

export interface BinFileParams {
  fileName: string
  filePath: string
}

export const writeBinFile = async (params: BinFileParams): Promise<void> => {
  const { fileName, filePath } = params
  const binPath = resolve(BASE_PATH, BIN_PATH)
  const normalizedFileName = fileName?.endsWith('.js') ? fileName : `${fileName}.js`

  try {
    const binFilePath = await resolveDir(binPath)
    const tmpl = `#!/usr/bin/env node\n\nrequire('${filePath}');\n`

    writeFile(join(binFilePath, normalizedFileName), tmpl)
  } catch (err: unknown) {
    setTimeout(() => {
      handleBuildError(`File "bin/${filePath}" does not exist.`)
    })
  }
}
