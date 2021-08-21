import BunyanLogger, { LogLevel } from 'bunyan'
import chalk, { Chalk } from 'chalk'
import { ValueOf } from 'type-fest'

const loggerLevel: LogLevel = process.env.NODE_ENV === 'production' ? 'fatal' : 'debug'

interface LoggerFnConfig {
  command: 'info' | 'warn' | 'error' | 'log' | 'success'
  color: Chalk
  icon: string
}

const colors: Record<string, LoggerFnConfig> = {
  log: {
    command: 'log',
    color: chalk.white,
    icon: '✏︎',
  },
  error: {
    command: 'error',
    color: chalk.red,
    icon: '✖',
  },
  info: {
    command: 'info',
    color: chalk.blue,
    icon: 'ℹ',
  },
  success: {
    command: 'info',
    color: chalk.green,
    icon: '✔',
  },
  warn: {
    command: 'warn',
    color: chalk.yellow,
    icon: '⚠',
  },
}

const loggerSettings = {
  name: 'avail-cli',
  serializers: BunyanLogger.stdSerializers,
  streams: [
    {
      stream: process.stdout,
      level: loggerLevel,
    },
  ],
}

interface LoggerFn {
  (...msgs: unknown[]): void
  b: (...msgs: unknown[]) => void
  dim: (...msgs: unknown[]) => void
}

function makeLoggerFn(log: BunyanLogger, cmd: keyof typeof colors): LoggerFn {
  const { command, color, icon } = colors[cmd] as ValueOf<typeof colors>

  const LoggerMethod = function (...msgs: unknown[]) {
    log[command](color(icon, ...msgs))
  }

  Object.defineProperties(LoggerMethod, {
    b: {
      set: (...msgs: unknown[]) => log[command](color.bold(icon, ...msgs)),
    },
    dim: {
      set: (...msgs: unknown[]) => log[command](color.dim(icon, ...msgs)),
    },
  })

  return LoggerMethod as LoggerFn
}

class Logger {
  static instance: Logger

  _logger = BunyanLogger.createLogger(loggerSettings)

  private constructor() {
    // This is a singleton
  }

  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }

    return Logger.instance
  }

  log: LoggerFn = makeLoggerFn(this._logger, 'log')
  info: LoggerFn = makeLoggerFn(this._logger, 'info')
  error: LoggerFn = makeLoggerFn(this._logger, 'error')
  warn: LoggerFn = makeLoggerFn(this._logger, 'warn')
  success: LoggerFn = makeLoggerFn(this._logger, 'success')

  exit(...msgs: unknown[]) {
    Logger.instance.error(msgs)
    process.exit(1)
  }

  show(...msgs: unknown[]) {
    console.log(...msgs)
  }
}

const logger = Logger.getInstance()

export { logger }
