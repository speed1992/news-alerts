const {
  config: { username, escapedPassword, recipients },
  APIConfig,
} = require("../config/config");

const send = require("gmail-send")({
  user: username,
  pass: unescape(escapedPassword),
  bcc: recipients,
  subject: "Latest version of create-react-app",
});

exports.sendMail = async ({ text, subject }) => {
  send({ text, subject }, (error, result, fullResult) => {
    if (error) console.error(error);
    console.log(result);
  });
};
