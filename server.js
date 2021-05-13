const cron = require("node-cron")

const { logger } = require("./config/logConfig")
const { CRA, handleFailure } = require("./utils/utils")
const { connectWithDatabase } = require("./utils/dbutils");
const { attachErrorHandlers } = require("./utils/globalExceptionHandlers");
const { slackPing } = require("./utils/slack");
const { getDateAndTime } = require("./utils/dateUtils");

logger.info("App started.")

const appStartedMessage = "\n\n\nApp Running on " + process.env.NODE_ENV + " environment\n\n\n"
logger.info(appStartedMessage);

try {
  attachErrorHandlers();

  if (process.env.NODE_ENV !== "production") {
    connectWithDatabase([CRA]);
  }
  else {
    slackPing(appStartedMessage + "at " + getDateAndTime());
    cron.schedule("0 0 * * * *", () => {
      connectWithDatabase([CRA])
    })
  }
} catch (e) {
  handleFailure(e)
}
