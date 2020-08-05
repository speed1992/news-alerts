// process.env.NODE_ENV = "production";

require("dotenv").config();

const mongoose = require("mongoose");
let cron = require("node-cron");

const { sendMail } = require("./utils/mailUtils");
const { config } = require("./config/config");
const { credentials } = require("./config/credentials");
const { logger } = require("./config/logConfig");

const URI = process.env.MONGODB_URL;

logger.info("App@@@@@@@@@@@@@@@@@@@@Started");
try {
  cron.schedule("0 0 * * * *", () => {
    mongoose.connect(
      URI,
      {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      async (err) => {
        if (err) {
          logger.info(
            "@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            err,
            "@@@@@@@@@@@@@@@@@@@@@@@"
          );
          throw err;
        }

        logger.info("@@@@@@@@@@@@@@@@@@@MongoDB is connected@@@@@@@@@@@@@@@@@");

        const response = await getLatestDataFromGithub();
        const { status: newVersionExists } = response;

        if (newVersionExists) {
          const {
            data: { name: version, html_url, body },
          } = response;
          const text = `${config.textLine2}: ${html_url}`;
          const subject = `${config.appName} ${version} ${config.subjectPhrase}`;

          config.emailFeature ? sendMail({ text, subject }) : null;
        }
      }
    );
  });
} catch (e) {
  logger.info(
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    e,
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
  );
  config.emailExceptions
    ? sendMail({
        text: JSON.stringify(e),
        subject: "Failure in the news tool",
        bcc: credentials.errorRecipients,
      })
    : true;
}
