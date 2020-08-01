require("dotenv").config();

const { getLatestDataFromGithub } = require("./utils/utils");

const mongoose = require("mongoose");

const newsModel = require("./models/newsModel");
const { sendMail } = require("./utils/mailUtils");
const { config } = require("./config/config");

const URI = process.env.MONGODB_URL;

try {
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
        const {
          data: { name: version, html_url, body },
        } = response;
        const text = `${config.textLine2}: ${html_url} ${config.regards}`;
        const subject = `${config.appName} ${version} ${config.subjectPhrase}`;

        config.emailFeature ? sendMail({ text, subject }) : null;
      }
    }
  );
} catch (e) {
  config.emailExceptions
    ? sendMail({
        text: JSON.stringify(e),
        subject: "Failure in the news tool",
      })
    : true;
}
