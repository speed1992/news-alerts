const {
  config: { recipients },
  APIConfig,
} = require("../config/config");
const { credentials } = require("../config/credentials");
const { logger } = require("../config/logConfig");

const send = require("gmail-send")({
  user: credentials.username,
  pass: unescape(credentials.escapedPassword),
  bcc: credentials.recipients,
  subject: "Latest version of create-react-app",
});

exports.sendMail = async ({ text, subject }) => {
  send({ text, subject }, (error, result, fullResult) => {
    if (error) console.error(error);
    logger.info(result);
  });
};
