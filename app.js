const { logger } = require("./config/logConfig")
const { CRA, handleFailure } = require("./utils/utils")
const { connectWithDatabase } = require("./utils/dbutils");
const { attachErrorHandlers } = require("./utils/globalExceptionHandlers");
const { slackPing } = require("./utils/slack");
const { getDateAndTime } = require("./utils/dateUtils");
const { sendMail } = require("./utils/mailUtils");
const { credentials } = require("./config/credentials");

function start() {
    logger.info("App started.")

    const appStartedMessage = "App Running on " + process.env.NODE_ENV + " environment"
    logger.info(appStartedMessage);

    try {
        attachErrorHandlers();
        slackPing(appStartedMessage + "at " + getDateAndTime());
        sendMail({
            text: appStartedMessage + "at " + getDateAndTime(),
            subject: "App launch",
            bcc: credentials.errorRecipients
        })
        connectWithDatabase([CRA])
    } catch (e) {
        handleFailure(e)
    }
}

module.exports.start = start