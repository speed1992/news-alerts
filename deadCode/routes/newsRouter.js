const newsController = require("../controllers/newsController");

const router = require("express").Router();

router
  .route("/")
  .get(newsController.getAllNews)
  .post(newsController.createNews);

router
  .route("/:id")
  .delete(newsController.deleteNews)
  .put(newsController.updateNews)
  .get(newsController.getNews);

module.exports = router;
