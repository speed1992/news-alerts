const { createLogger, format, transports } = require("winston")
const { printf, colorize } = format

const myFormat = printf(({ timestamp, level, message, meta }) => {
  return `${timestamp};${level};${message};${meta ? JSON.stringify(meta) : ""}`
})

const logger = createLogger({
  level: "info",
  format: format.combine(
    colorize({ all: true }),
    format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss"
    }),
    format.errors({ stack: true }),
    format.splat(),
    myFormat
  ),
  transports: [
    new transports.File({ filename: "quick-start-error.log", level: "error" }),
    new transports.File({ filename: "quick-start-combined.log" })
  ]
})

logger.add(
  new transports.Console({
    format: format.combine(format.colorize(), format.simple())
  })
)

module.exports.logger = logger
