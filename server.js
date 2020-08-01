require("dotenv").config();

const { getLatestDataFromGithub } = require("./utils/utils");

const mongoose = require("mongoose");

const newsModel = require("./models/newsModel");
const { sendMail } = require("./utils/mailUtils");
const { config } = require("./config/config");

const URI = process.env.MONGODB_URL;

mongoose.connect(
  URI,
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  async (err) => {
    if (err) throw err;

    console.log("MongoDB is connected");

    const response = await getLatestDataFromGithub();
    const { status: newVersionExists } = response;
    if (newVersionExists) {
      const { name: version } = response;
      const text = `${config.textLine1} ${version}.\n\n${config.textLine2}: ${html_url}`;
      const subject = `${config.appName} ${version} ${config.subjectPhrase}`;

      sendMail({ text, subject });
    }
  }
);
