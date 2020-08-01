const axios = require("axios");
const { checkIfVersionExistsInDatabase } = require("./dbutils");
const { APIConfig } = require("../config/config");

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

  try {
    const { data } = await axios.get(URL);

    const { name: version } = data;

    const status = await checkIfVersionExistsInDatabase(version);

    const newVersionExists = !status;

    if (!status) {
      console.log("new version came", version);
      return {
        status: newVersionExists,
        data: { ...data },
      };
    } else {
      console.log("version exists");
      return { status: newVersionExists };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.isEnvProduction = isEnvProduction;
