import yargs from 'yargs'
import { handleBuildError } from '../utils'

import { generate } from './generate'
import { yargsOptions } from './options'

const run = async () => {
  const argv = yargsOptions(yargs(process.argv.slice(2)))

  await generate(argv).catch((err: unknown) =>
    handleBuildError('Could not run `generate colors` command', err),
  )
}

run()
