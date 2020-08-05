// const News = require("../models/newsModel");

// const newsController = {
//   getAllNews: async (req, res) => {
//     const products = await News.find();
//     res.json(products);
//     //   res.json({ msg: "Inside controller getNews" });
//   },
//   createNews: async (req, res) => {
//     const { news_id, news_title, info } = req.body;
//     const news = await News.findOne({ info });
//     if (news)
//       return res.status(400).json({
//         msg: "News already exists",
//       });

//     const newNews = new News({
//       news_id,
//       news_title,
//       info,
//     });

//     await newNews.save();

//     res.json("created a news");
//   },
//   deleteNews: async (req, res) => {
//     await News.findByIdAndDelete(req.params.id);
//     res.json({ msg: "Deleted news" });
//   },
//   updateNews: async (req, res) => {
//     const { news_id, news_title, info } = req.body;

//     await News.findByIdAndUpdate(s
//       { _id: req.params.id },
//       {
//         news_id,
//         news_title,
//         info,
//       }
//     );
//     res.json({ msg: "Updated successfully" });
//   },
//   getNews: (req, res) => {
//     res.json({ msg: "Inside controller getNews" });
//   },
// };

// module.exports = newsController;
