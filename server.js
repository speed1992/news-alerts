require("dotenv").config();

const { hitGithubAPI } = require("./utils/utils");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// const newsRouter = require("./routes/newsRouter");
const newsModel = require("./models/newsModel");

const app = express();

app.use(cors());

app.use(express.json());

// app.use("/api/news", newsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port", port);
});

const URI = process.env.MONGODB_URL;

mongoose.connect(
  URI,
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB is connected");
    hitGithubAPI();
  }
);
