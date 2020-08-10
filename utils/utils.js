const axios = require("axios");
const { checkIfVersionExistsInDatabase } = require("./dbutils");
const { APIConfig } = require("../config/config");
const { logger } = require("../config/logConfig");

isEnvProduction = function () {
  return process.env.NODE_ENV === "production";
};
getURL = () => {
  if (isEnvProduction()) url = APIConfig.prod_URL;
  else url = APIConfig.dev_URL;
  return url;
};

exports.getLatestDataFromGithub = async () => {
  const URL = getURL();

  logger.info("Hitting " + URL);

  try {
    const { data } = await axios.get(URL);

    const { name: version } = data;

    const status = await checkIfVersionExistsInDatabase(version);

    const newVersionExists = !status;

    if (status === false) {
      logger.info("new version came" + version);
      return {
        status: newVersionExists,
        data: { ...data },
      };
    } else if (status === true) {
      logger.info("version exists");
      return { status: newVersionExists };
    }
  } catch (error) {
    logger.info(error);
    throw error;
  }
};

exports.isEnvProduction = isEnvProduction;
