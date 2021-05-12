const axios = require("axios")
const { checkIfVersionExistsInDatabase } = require("./dbutils")
const { APIConfig, config } = require("../config/config")
const { logger } = require("../config/logConfig")
const { sendMail } = require("./mailUtils")
const { getDateAndTime } = require("./dateUtils")
const { credentials } = require("../config/credentials")
const { slackSuccess, slackError, slackPing } = require("./slack")

const isEnvProduction = function () {
  return process.env.NODE_ENV === "production"
}
const getURL = () => {
  if (isEnvProduction()) return APIConfig.prod_URL
  else return APIConfig.dev_URL
}

module.exports.getLatestDataFromGithub = () => {
  return new Promise(async (resolve, reject) => {
    const URL = getURL()

    logger.info("Hitting " + URL)

    try {
      const { data } = await axios.get(URL)
      const { name: version } = data

      const status = await checkIfVersionExistsInDatabase(version)
      if (status === undefined) throw new Error("Status from db is undefined")
      const newVersionExists = !status
      logger.info("New version exists? " + newVersionExists)

      if (newVersionExists !== undefined && newVersionExists === true) {

        logger.info("new version has come " + version)
        resolve({
          status: newVersionExists,
          data: { ...data }
        })

      } else if (newVersionExists !== undefined && newVersionExists === false) {

        logger.info("version already exists")
        resolve({ status: newVersionExists })

      }
    } catch (error) {
      logger.info(error)
      reject(error)
    }
  });

}

module.exports.CRA = async (err) => {
  if (err) {
    logger.info(err)
    throw err
  }

  logger.info("\n\n**MongoDB is connected**\n\n")

  const response = await this.getLatestDataFromGithub()
  const { status: newVersionExists } = response
  if (newVersionExists !== undefined && newVersionExists === true) {
    const {
      // eslint-disable-next-line camelcase,no-unused-vars
      data: { name: version, html_url, body }
    } = response
    // eslint-disable-next-line camelcase
    const text = `${config.textLine2} ${html_url}`
    const subject = `${config.appName} ${version} ${config.subjectPhrase}`
    if (config.emailFeature) {
      slackSuccess(subject + "\n\n" + text);
      sendMail({ text, subject })
    }
  }
  if (newVersionExists !== undefined)
    slackPing("Successfully run at " + getDateAndTime());
}

module.exports.handleFailure = (e) => {
  if (config.emailExceptions) {
    logger.info("\n\n" + e + "\n\n")

    slackError(e);

    sendMail({
      text: e,
      subject: "Failure in the news tool",
      bcc: credentials.errorRecipients
    })
  }
}

module.exports.isEnvProduction = isEnvProduction
