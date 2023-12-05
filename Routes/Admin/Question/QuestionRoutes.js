import express from "express";
const router = express.Router();
import QuestionsSchema from "../../../Models/QuestionsModel/Question.js";
import { handleServerError, handleNotFound } from "../../../Middlewares/middle.js";

router.post("/addQuestion", async (req, res) => {
  const newQuestion = new QuestionsSchema({
    text: req.body.text,
    options: req.body.options,
    correctAnswer: req.body.correctAnswer,
    IsArticle: req.body.IsArticle,
    IsDescriptive: req.body.IsDescriptive,
    category: req.body.category,
  });

  try {
    const savedQuestion = await new newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    handleServerError(res, error);
  }
});

router.put("/updateQuestion/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const updatedQuestions = QuestionsSchema.findByIdAndUpdate(
      id,
      {
        $set: {
          text: req.body.text,
          options: req.body.options,
          correctAnswer: req.body.correctAnswer,
          IsArticle: req.body.IsArticle,
          IsDescriptive: req.body.IsDescriptive,
          category: req.body.category,
        },
      },
      { new: true }
    );

    if (!updatedQuestions) {
      return handleNotFound(res, "Category not found");
    }

    res.status(201).json(updatedQuestions);
  } catch (error) {
    handleServerError(res, error);
  }
});

router.delete("/delQuestion/:id", async (req, res) => {
  const id = req.params.id;

  const deletedQuestion = QuestionsSchema.findByIdAndDelete(id);
  if (!deletedQuestion) {
    return handleNotFound(res, "Question not found");
  }

  try {
    const deletedQuestion = await new deletedQuestion.save();
    res.status(201).json(deletedQuestion);
  } catch (error) {
    handleServerError(res, error);
  }
});

export { router as questionRoutes };
