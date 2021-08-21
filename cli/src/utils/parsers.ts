import { PathLike } from 'fs'
import { readFile } from 'fs/promises'
import { join } from 'path'
import chalk from 'chalk'

import { logger } from '../logger'

import { findFile, handleBuildError, isFile } from './fs'

/**
 * @name parseFile
 * @description Return a file's contents.
 *
 * @param filePath - The path to the file to read
 * @param errorMsg - [Optional] error message to display on failure
 */
export const parseFile = async <T = unknown>(
  filePath: PathLike,
  errorMsg = `"${filePath}" is not valid, please specify a file or use inline JSON.`,
): Promise<T> => {
  try {
    let json: string | Buffer

    if (isFile(filePath)) {
      json = await readFile(filePath, 'utf8')
    } else {
      json = filePath as string
    }

    const parsed = JSON.parse(json as string)

    return Array.isArray(parsed) ? parsed[0] : parsed
  } catch (error: unknown) {
    handleBuildError(errorMsg, error)
  }
}

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
