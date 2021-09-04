import { PathLike } from 'fs'
import { join, resolve } from 'path'
import yargs from 'yargs'
import { ROOT_PATH } from '../const'

import { parseFile } from '../utils'
import {
  AvailArgvOptions,
  AvailBaseOptions,
  buildCommand,
  parseConfig,
  validate,
} from '../utils/options'

interface SvgrConfig {
  native?: boolean
  typescript?: boolean
  plugins?: string[]
  svgoConfig?: {
    plugins?: { [key: string]: boolean }[]
    [key: string]: any
  }
  [key: string]: any
}

export interface IconsOptions<TPrettier extends string | string[] = string>
  extends AvailBaseOptions<TPrettier> {
  /**
   * [Optional] Relative URL to a directory containing raw SVG icon files.
   */
  srcDir?: PathLike

  /**
   * @property filePrefix [Optional]
   * @description File name prefix to prepend to each file/component's name.
   * Every SVG file converted to a component will have a file name and component
   * name starting with the configured prefix and the name will be pascal-cased
   * (e.g., if `filePrefix` is "Example" then "clock.svg" becomes "ExampleClock.tsx").
   * The prefix will also be applied to relative `aria-*` attributes in a hyphenated
   * form (e.g., "example-clock") and to the `<title>` element in a title-cased
   * form (e.g., `Example Clock`).
   * @default '' (empty string)
   */
  filePrefix?: string

  /**
   * @property fileSuffix [Optional]
   * @description File name suffix to append to each file/component's name.
   * Every SVG file converted to a component will have a file name and component
   * name ending with the configured suffix and the name will be pascal-cased
   * (e.g., default `fileSuffix` is "icon" then "clock.svg" becomes "ClockIcon.tsx").
   * The suffix will also be applied to relative `aria-*` attributes in a hyphenated
   * form (e.g., "clock-icon") and to the `<title>` element in a title-cased
   * form (e.g., "Clock Icon").
   * @default 'icon'
   */
  fileSuffix?: string
}

const availCmdOptions: Partial<AvailArgvOptions> = {
  /**
   * [Optional] The name of the generated file containing the icon map.
   */
  fileName: { default: 'index.ts' },

  filePrefix: {
    type: 'string',
    alias: 'prefix',
    default: '',
    requiresArg: true,
  },

  fileSuffix: {
    type: 'string',
    alias: 'suffix',
    default: 'icon',
    requiresArg: true,
  },

  // outDir: { default: resolve(ROOT_PATH, 'client/src/elements/Icon/icons') },
  srcDir: {
    type: 'string',
    default: resolve(ROOT_PATH, 'assets/icons'),
    requiresArg: true,
  },
}

export const yargsOptions = (
  yargs: yargs.Argv<IconsOptions<string>>,
): ReturnType<typeof yargsOptions> =>
  yargs
    .help('help')
    .usage('Usage: $0 <command> [options]')
    .command<IconsOptions>(
      'icons',
      'Generate SVG icon components from a folder of SVG files',
      (args: yargs.Argv<IconsOptions<string>>) => buildCommand(args, availCmdOptions),
    )
    .example(
      '$0 icons -srcDir assets/icons -o src/icons',
      'Generates React components for SVG icons in in src/icons directory along with icon map',
    )
    .check(validate)
    // .wrap(100)
    .config(
      'config',
      async (configPath: string) =>
        await parseConfig(configPath, parseFile<SvgrConfig>(join(__dirname, 'config.json'))),
    ).argv
