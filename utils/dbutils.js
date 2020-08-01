const newsModel = require("../models/newsModel");
async function checkIfNewsExists(news, version) {
  try {
    if (!news) {
      await newsModel.updateOne(
        { news_title: "create-react-app" },
        {
          news_title: "create-react-app",
          info: version,
        },
        { upsert: true }
      );
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
