// process.env.NODE_ENV = "production";

require("dotenv").config()
const cron = require("node-cron")

const { logger } = require("./config/logConfig")
const { CRA, handleFaliure } = require("./utils/utils")
const { connectWithDatabase } = require("./utils/dbutils")

try {
  logger.info("App started.")

  // cron.schedule("0 0 * * * *", () => {
  connectWithDatabase([CRA])
  // })
} catch (e) {
  handleFaliure(e)
}
