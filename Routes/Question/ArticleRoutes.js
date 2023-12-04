import express from "express";
const router = express.Router();
import Article from "../../Models/QuestionsModel/Article.js";
import { handleServerError, handleNotFound } from "../../Middlewares/middle.js";

router.get("/getArticles", async (req, res) => {


  try {
    const allArticles = await Article.find();
    res.status(201).json(allArticles);
  } catch (error) {
    handleServerError(res, error);
  }
});


router.post("/addArticle", async (req, res) => {
  const newArticle = new Article({
    name: req.body.name,
    questions: req.body.questions
  });

  try {
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    handleServerError(res, error);
  }
});

export { router as articleRoutes };
