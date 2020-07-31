const axios = require("axios");
const News = require("../models/newsModel");

const {
  config: { username, escapedPassword, recipients },
  APIConfig,
} = require("../config/config");
const newsModel = require("../models/newsModel");

send = require("gmail-send")({
  user: username,
  pass: unescape(escapedPassword),
  to: recipients,
  subject: "Latest version of create-react-app",
});

exports.checkIfStringExists = function (FILE_LOCATION, searchString) {
  fs.readFile(FILE_LOCATION, function (err, data) {
    if (err) throw err;
    if (data.indexOf(searchString) >= 0) {
      return true;
    }
  });
};

getVersionFromResponse = ({ data }) => {
  try {
    return data.name;
  } catch (e) {}
};

isEnvProduction = function () {
  return process.env.NODE_ENV === "production";
};

sendMail = (text) => {
  send({ text }, (error, result, fullResult) => {
    if (error) console.error(error);
    console.log(result);
  });
};

createRecord = async function (version) {
  // console.log(version);
  const newNews = new News({
    news_title: "CRA-latest-version",
    info: version,
  });

  await newNews.save();
};

checkIfVersionExistsInDatabase = async function (version) {
  // console.log("News inside checkIfVersionExistsInDatabase", version);
  await newsModel.findOne({ info: version }, async (err, news) => {
    // console.log("news found?", news);
    async function checkIfNewsExists(news) {
      try {
        if (news === null || news === undefined) {
          console.log("news value", news);
          // console.log("news not there", version);
          // send(
          //   { text: "Latest version is " + version + " Please upgrade" },
          //   (error, result, fullResult) => {
          //     if (error) console.error(error);
          //     console.log(result);
          //   }
          // );
          await createRecord(version);
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    }
    if (!err) return checkIfNewsExists();
    else return false;
  });
};

exports.hitGithubAPI = () => {
  if (isEnvProduction()) url = APIConfig.prod_URL;
  else url = APIConfig.dev_URL;

  axios
    .get(APIConfig.dev_URL)
    .then(async (response) => {
      const version = getVersionFromResponse(response);
      console.log("version from api", version);
      if (!checkIfVersionExistsInDatabase(version)) {
        console.log("new version came");
      } else {
        console.log("version exists");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.isEnvProduction = isEnvProduction;
