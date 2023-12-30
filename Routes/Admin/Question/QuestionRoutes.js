import express from "express";
const router = express.Router();
import QuestionsSchema from "../../../Models/QuestionsModel/Question.js";
import { multerConfig } from "../../../Middlewares/imageUpload.js";
import {
  handleServerError,
  handleNotFound,
} from "../../../Middlewares/middle.js";
import { isAdmin } from "../../../Middlewares/RoleMiddleware.js";

router.get("/getQuestions", async (req, res) => {
  try {
    const allQuestions = await QuestionsSchema.find();

    if (!allQuestions) {
      return handleNotFound(res, "Question not found");
    }
    res.status(201).json(allQuestions);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/addQuestion", multerConfig, async (req, res) => {
  const newQuestion = new QuestionsSchema({
    question: req.body.question,
    options: req.body.options,
    correctOpt: req.body.correctOpt,
    category: req.body.category,
    imgPath: `/uploads/${req.file?req.file.filename: 'noImage.png'}`,
    answer: req.body.answer,
  });

  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    handleServerError(res, error);
  }
});

// router.post('/upload', multerConfig, (req, res) => {
//   const { filename, path } = req.file;

//   // Save the filename and path to the database if needed

//   res.json({ filename, path });
// });

router.put("/updateQuestion/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const updatedQuestions = await QuestionsSchema.findByIdAndUpdate(
      id,
      {
        $set: {
          question: req.body.question,
          options: req.body.options,
          correctOpt: req.body.correctOpt,
          answer: req.body.answer,
          category: req.body.category,
        },
      },
      { new: true }
    ).exec();

    if (!updatedQuestions) {
      return handleNotFound(res, "Question not found");
    }

    res.status(201).json(updatedQuestions);
  } catch (error) {
    handleServerError(res, error);
  }
});

router.delete("/delQuestion/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedQuestion = await QuestionsSchema.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Use status code 200 for successful deletion
    res
      .status(200)
      .json({ message: "Question deleted successfully", deletedQuestion });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { router as questionRoutes };
