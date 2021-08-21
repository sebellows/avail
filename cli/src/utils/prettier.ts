import { readFile } from 'fs/promises'
import { join } from 'path'
import chalk from 'chalk'

import { logger } from '../logger'

import { findFile } from './fs'
import { parseFile } from './parsers'

/**
 * @name getPrettierConfig
 * @description
 * Locate a `prettierrc[.js?on]` file or locate a prettier config defined in the root package.json.
 */
export const getPrettierConfig = async (
  rootPath: string,
  prettierConfigPath?: string,
  verbose?: boolean,
): Promise<string[]> => {
  const rootPrettierrcFile = await findFile(rootPath, 'prettierrc', verbose)

  let prettierConfig = []

  if (prettierConfigPath || rootPrettierrcFile) {
    const prettierPath = prettierConfigPath ?? rootPrettierrcFile

    try {
      prettierConfig = (await parseFile(prettierPath)) as any[]
    } catch {
      prettierConfig = null
    }
  } else {
    type Package = { prettier?: any[] }

    const pkg = JSON.parse(await readFile(join(rootPath, 'package.json'), 'utf8')) as Package

    if (verbose) {
      logger.info(chalk.blue('...checking package.json for Prettier configuration'))
    }

    // eslint-disable-next-line dot-notation
    prettierConfig = pkg['prettier'] ?? null

    if (prettierConfig && verbose) {
      logger.info(chalk.blue('...found Prettier configuration in package.json'))
    }
  }

  if (!prettierConfig && verbose) {
    logger.warn(
      chalk.yellow('...no Prettier configuration was found. Default settings will be applied.'),
    )
  }

  return prettierConfig
}
