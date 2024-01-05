import express from "express";
const router = express.Router();

import {
  assignUserQuestions,
  updateUserQuestion,
  calATDResult,
} from "../../Middlewares/ATDMiddle.js";

router.get("/test", async (req, res) => {
  try {
    await assignUserQuestions("KUNALSOni", req, res);
  } catch (error) {
    res.status(401).json(error);
  }
});

router.put("/updateSelectedAnswers/:id", async (req, res) => {
  await updateUserQuestion(req, res);
});

router.post("/calculateATD/:id", async (req, res) => {
  await calATDResult(req, res);
});

export { router as ATDTestRoutes };
