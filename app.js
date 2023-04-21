const { logger } = require("./config/logConfig");
const { CRA, handleFailure } = require("./utils/utils");
const { connectWithDatabase } = require("./utils/dbutils");
const { attachErrorHandlers } = require("./utils/globalExceptionHandlers");
const { slackPing } = require("./utils/slack");
const { getDateAndTime } = require("./utils/dateUtils");
const { sendMail } = require("./utils/mailUtils");
const { credentials } = require("./config/credentials");

function start(res) {
  logger.info("App started.");

  const appStartedMessage =
    "App Running on " +
    process.env.NODE_ENV +
    " environment" +
    " at " +
    getDateAndTime();
  logger.info(appStartedMessage);

  try {
    attachErrorHandlers();
    // slackPing(appStartedMessage);
    connectWithDatabase([() => CRA(res)]);
  } catch (e) {
    handleFailure(e);
  }
}

module.exports.start = start;
