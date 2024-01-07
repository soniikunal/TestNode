import express from "express";
import TestScoreSchema from "../../Models/AnswerModal/TestScoreSchema.js";
import { SaveResult } from "../../Middlewares/TestMiddle.js";
const router = express.Router();

router.get("/getUsers", async (req, res) => {
  try {
    const userScores = await TestScoreSchema.find();
    if (!userScores) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(userScores);
  } catch (error) {
    res.status(500).json({ error: message });
  }
});

router.post("/typingscore/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { str } = req.body;
    if (id) {
      const savedRecord = SaveResult(id, str, "TypingTest");
      res.status(200).json(savedRecord);
    }
  } catch (error) {
    res.status(500).json({ error: message });
  }
});

export { router as TestScoreRoutes };
