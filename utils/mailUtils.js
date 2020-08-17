
const { credentials } = require("../config/credentials")
const { logger } = require("../config/logConfig")

const send = require("gmail-send")({
  user: credentials.username,
  pass: unescape(credentials.escapedPassword),
  bcc: credentials.recipients,
  subject: "Latest version of create-react-app"
})

module.exports.sendMail = async ({ text, subject }) => {
  send({ text, subject }, (error, result, fullResult) => {
    if (error) logger.info(error)
    logger.info(result)
  })
}
