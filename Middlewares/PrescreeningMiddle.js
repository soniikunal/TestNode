import mongoose from "mongoose";
import PreScreeningSchema from "../Models/AnswerModal/PreScreeningSchema.js";
import QuestionsSchema from "../Models/QuestionsModel/Question.js";
import TestScoreSchema from "../Models/AnswerModal/TestScoreSchema.js";
import { SaveResult } from "./TestMiddle.js";

export const assignUserQuestions = async (req, res) => {
  try {
    const userId = req.user.id;
    const existingUser = await PreScreeningSchema.findOne({ userId });

    if (existingUser) {
      if (existingUser._doc.isSubmitted === true) {
        return res.status(203).json({
          message: "You have already submitted the Prescreening Test!",
        });
      }
      return res.status(200).json({
        message: "Your test is already in progress!",
        user: existingUser,
      });
    }

    // Fetch 10 random questions
    const randomQuestions = await QuestionsSchema.aggregate([
      { $sample: { size: 10 } },
      {
        $addFields: {
          selectedOption: null,
        },
      },
      {
        $project: {
          correctOpt: 0, // Exclude the correctOpt field
        },
      },
    ]);

    // Create a new user with assigned questions
    const newUser = await PreScreeningSchema.create({
      userId: userId,
      assignedQuestions: randomQuestions,
    });

    return res
      .status(201)
      .json({ message: "Your test is ready!", user: newUser });
  } catch (error) {
    console.error("Error assigning questions:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserQuestion = async (req, res) => {
  try {
    const identifier = req.user.id;
    const { questionId, selectedAnswer, remainingTime } = req.body;

    // Validate if questionId and selectedAnswer are present in the request body
    if (!questionId) {
      return res.status(400).json({
        message:
          "Both questionId and selectedAnswer are required in the request body",
      });
    }

    // Find and update the record based on userId or _id
    let updatedPreScreeningAnswer;
    if (identifier) {
      // If identifier is a valid ObjectId, assume it's _id
      // updatedPreScreeningAnswer = await PreScreeningSchema.findByIdAndUpdate(
      //   identifier,
      //   {
      //     $set: {
      //       "assignedQuestions.$[elem].selectedAnswer": selectedAnswer,
      //       remainingTime,
      //     },
      //   },
      //   { arrayFilters: [{ "elem._id": questionId }], new: true },
      //   { new: true }
      // );
      updatedPreScreeningAnswer = await PreScreeningSchema.findOneAndUpdate(
        { userId: identifier, "assignedQuestions._id": questionId },
        {
          $set: {
            "assignedQuestions.$[elem].selectedAnswer": selectedAnswer,
            remainingTime,
          },
        },
        { arrayFilters: [{ "elem._id": questionId }], new: true }
      );
    }

    if (!updatedPreScreeningAnswer) {
      return res.status(404).json({ message: "PreScreeningAnswer not found" });
    }
    res.status(201).json(updatedPreScreeningAnswer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const calPrescreenResult = async (req, res) => {
  try {
    const userId = req.user.id;
    // Fetch the user's selected answers
    // const userAnswers = await PreScreeningSchema.find(_id).lean();
    const userAnswers = await PreScreeningSchema.findOne({ userId }).lean();

    if (!userAnswers) {
      return res.status(404).json({ message: "User's answers not found" });
    }

    // Perform your calculations based on the user's selected answers
    const finalResult = await calculateResult(userAnswers);
    if (finalResult <= 0) {
      // const setIsSubmitted = await PreScreeningSchema.findByIdAndUpdate(_id, {
      //   $set: { isSubmitted: true },
      // });
      await PreScreeningSchema.findOneAndUpdate(
        { userId },
        {
          $set: { isSubmitted: true },
        }
      );
    }
    SaveResult(userId, finalResult, "Prescreening");
    res
      .status(200)
      .json({ success: true, message: "Score has been saved to Database!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const calculateResult = async (userAnswers) => {
  const userObjects = userAnswers.assignedQuestions.map(
    ({ _id, selectedAnswer }) => ({ _id, selectedAnswer })
  );

  let score = 0;

  // Iterate over userResponses
  for (const userResponse of userObjects) {
    const { _id, selectedAnswer } = userResponse;

    // Retrieve the question from the database based on _id
    const question = await QuestionsSchema.findById(_id);

    if (question) {
      // Check if the selected option is correct
      if (selectedAnswer == question.correctOpt) {
        score++;
      }
    }
  }

  return score;
};
