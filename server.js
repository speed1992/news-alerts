const cron = require("node-cron")

const { logger } = require("./config/logConfig")
const { CRA, handleFailure } = require("./utils/utils")
const { connectWithDatabase } = require("./utils/dbutils")

logger.info("\n\n\nApp Running on " + process.env.NODE_ENV + " environment\n\n\n");

try {
  logger.info("App started.")

  if (process.env.NODE_ENV !== "production") {
    connectWithDatabase([CRA]);
  }
  else {
    cron.schedule("0 0 * * * *", () => {
      connectWithDatabase([CRA])
    })
  }
} catch (e) {
  handleFailure(e)
}

process
  .on('unhandledRejection', (reason, p) => {
    const report = `${reason} Unhandled Rejection at Promise ${JSON.stringify(reason.stack)}`
    handleFailure(report);
  })
  .on('uncaughtException', err => {
    handleFailure(JSON.stringify(err));
  });