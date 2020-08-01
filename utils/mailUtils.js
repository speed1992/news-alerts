const {
  config: { recipients },
  APIConfig,
} = require("../config/config");
const { credentials } = require("../config/credentials");

const send = require("gmail-send")({
  user: credentials.username,
  pass: unescape(credentials.escapedPassword),
  bcc: recipients,
  subject: "Latest version of create-react-app",
});

exports.sendMail = async ({ text, subject }) => {
  send({ text, subject }, (error, result, fullResult) => {
    if (error) console.error(error);
    console.log(result);
  });
};
