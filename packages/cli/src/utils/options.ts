import { PathLike } from 'fs'
import { join } from 'path'
import { Replace } from '@avail/core/src'
import yargs from 'yargs'
import { ROOT_PATH } from '../const'

import { parseFile } from '../utils'
import { resolveDir } from './fs'
import { getPrettierConfig } from './parsers'

export interface AvailBaseOptions<TPrettier extends string | string[] = string> {
  /**
   * [Optional] Relative URL to a JSON file or a configuration.
   */
  config?: string

  /**
   * [Optional] The absolute URL to the directory where the `palette.ts` file should be generated.
   */
  outDir?: string

  /**
   * [Optional] The name of the generated file containing the palette colors.
   */
  fileName?: string

  /**
   * [Optional] Use Prettier to format the colors file. Either path to `.prettierrc` file or boolean string.
   */
  prettier?: TPrettier
}

export interface AvailArgvOptions {
  config: yargs.Options
  outDir: yargs.Options
  fileName: yargs.Options
  prettier: yargs.Options
  [key: string]: yargs.Options
}

export async function parseConfig<
  TBaseOptions,
  TOptions extends TBaseOptions & AvailBaseOptions = TBaseOptions & AvailBaseOptions,
>(configPath?: PathLike, baseConfig?: Promise<TBaseOptions>): Promise<TBaseOptions & TOptions> {
  let defaultConfig = {}

  if (baseConfig) {
    const _baseConfig = await baseConfig

    defaultConfig = { ...defaultConfig, ..._baseConfig }
  }

  if (!configPath) {
    return defaultConfig as TBaseOptions & TOptions
  }

  const configObj = await parseFile<TOptions>(configPath)

  return { ...defaultConfig, ...configObj }
}

export function buildCommand(
  commandYargs: yargs.Argv,
  availArgs?: Partial<AvailArgvOptions>,
): yargs.Argv<AvailArgvOptions> {
  const options: AvailArgvOptions = {
    config: {
      type: 'string',
      alias: 's',
      requiresArg: true,
    },
    outDir: {
      type: 'string',
      alias: 'o',
      // default: join(process.cwd(), 'colors'),
      requiresArg: true,
    },
    fileName: { type: 'string', alias: 'f', default: 'colors.ts', requiresArg: true },
    prettier: { type: 'string', alias: 'p', default: 'true' },
  }

  if (availArgs) {
    Object.keys(availArgs).forEach((key) => {
      if (key in options) {
        options[key] = { ...options[key], ...availArgs[key] }
      } else {
        options[key] = availArgs[key]
      }
    })
  }

  return commandYargs.options(options)
}

export function validate(args: yargs.Arguments): boolean {
  if (args._.length > 0) {
    throw new Error(`Unsupported positional arguments: "${args._.join('", "')}"`)
  }

  for (const key of Object.keys(args)) {
    // We have no options that allow for arrays
    const val = args[key]

    if (key !== '_' && Array.isArray(val)) {
      throw new Error(`Multiple values were provided for: "${key}": "${val.join('", "')}"`)
    }
  }

  return true
}

const resolvePrettierArg = async (value: string): Promise<string[]> => {
  if (!value.length || value === 'false') {
    return []
  }

  let prettierPath = join(ROOT_PATH, '.prettierrc.json')

  if (value?.length && value !== 'true') {
    prettierPath = value
  }

  const prettierConfig = await getPrettierConfig(ROOT_PATH, prettierPath)

  return prettierConfig
}

export type NormalizedOptions<TOptions extends AvailBaseOptions> = Replace<
  TOptions,
  'prettier',
  string[]
> &
  AvailBaseOptions<string[]>

export const normalizeOptions = async <TOptions extends AvailBaseOptions = AvailBaseOptions>(
  yargsOptions: yargs.Arguments<TOptions & AvailBaseOptions<string>>,
  updatedOptions: Partial<TOptions> = {},
): Promise<NormalizedOptions<TOptions>> => {
  const { outDir, prettier, ...rest } = yargsOptions
  const options = { ...rest } as unknown as NormalizedOptions<TOptions>

  options.outDir = await resolveDir(outDir)
  options.prettier = await resolvePrettierArg(prettier as string)

  // normalize the tints by weeding out min and max
  if (updatedOptions) {
    Object.entries(updatedOptions).forEach(([k, v]) => {
      options[k] = v
    })
  }

  return options
}
