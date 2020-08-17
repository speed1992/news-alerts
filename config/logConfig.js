const { createLogger, format, transports } = require("winston")
const { printf } = format

const myFormat = printf(({ timestamp, level, message, meta }) => {
  return `${timestamp};${level};${message};${meta ? JSON.stringify(meta) : ""}`
})

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss"
    }),
    format.errors({ stack: true }),
    format.splat(),
    myFormat
  ),
  // defaultMeta: { service: "your-service-name" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new transports.File({ filename: "quick-start-error.log", level: "error" }),
    new transports.File({ filename: "quick-start-combined.log" })
  ]
})

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  )
}

module.exports.logger = logger
