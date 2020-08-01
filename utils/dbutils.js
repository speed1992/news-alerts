const newsModel = require("../models/newsModel");

const createRecord = async function (version) {
  const newNews = new newsModel({
    news_title: "CRA-latest-version",
    info: version,
  });

  await newNews.save();
};

async function checkIfNewsExists(news, version) {
  debugger;
  try {
    if (!news) {
      await createRecord(version);
      return false;
    }
  } catch (e) {
    console.log(e);
  }
  return true;
}

exports.checkIfVersionExistsInDatabase = async function (version) {
  let status = false;
  await newsModel.findOne({ info: version }, async (err, news) => {
    console.log("news found?", news);

    if (!err) {
      status = await checkIfNewsExists(news, version);
    }
  });
  return status;
};
