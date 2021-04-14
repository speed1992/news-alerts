require("dotenv").config()
const cron = require("node-cron")

const { logger } = require("./config/logConfig")
const { CRA, handleFaliure } = require("./utils/utils")
const { connectWithDatabase } = require("./utils/dbutils")
const { config } = require("./config/config")

process.env.NODE_ENV = config.appMode

logger.info("App Running on " + process.env.NODE_ENV + " environment");

try {
  logger.info("App started.")

  if (process.env.NODE_ENV !== "production") {
    connectWithDatabase([CRA]);
  }
  else{
    cron.schedule("0 0 * * * *", () => {
      connectWithDatabase([CRA])
    })
  }
} catch (e) {
  handleFaliure(e)
}
