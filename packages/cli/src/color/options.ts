import { join } from 'path'
import yargs from 'yargs'

import { parseFile } from '../utils'
import {
  AvailArgvOptions,
  AvailBaseOptions,
  buildCommand,
  parseConfig,
  validate,
} from '../utils/options'
import { ColorConfigInput } from './types'

export interface ColorOptions<TPrettier extends string | string[] = string>
  extends AvailBaseOptions<TPrettier> {
  /**
   * [Optional] The name for the file containing the types used by the colors file
   */
  typesFileName?: string
}

const availCmdOptions: Partial<AvailArgvOptions> = {
  fileName: { default: 'colors.ts' },
  outDir: { default: join(process.cwd(), 'colors') },
  typesFileName: { type: 'string', alias: 't', default: 'colors.types.ts', requiresArg: true },
}

export const yargsOptions = (
  yargs: yargs.Argv<ColorOptions<string>>,
): ReturnType<typeof yargsOptions> =>
  yargs
    .help('help')
    .usage('Usage: $0 <command> [options]')
    .command<ColorOptions>(
      'colors',
      'Generate a color palette file',
      (args: yargs.Argv<ColorOptions<string>>) => buildCommand(args, availCmdOptions),
    )
    .example(
      '$0 colors -f my-colors.ts -o src/theme/color',
      'Generates file "my-colors.ts" in src/theme/color directory path',
    )
    .check(validate)
    // .wrap(100)
    .config(
      'config',
      async (configPath: string) =>
        await parseConfig(configPath, parseFile<ColorConfigInput>(join(__dirname, 'config.json'))),
    ).argv
