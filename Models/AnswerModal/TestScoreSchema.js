import { Schema, model } from "mongoose";

const TestScoreSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    Prescreening: {
      type: String,
      required: true,
      default: null,
    },
    ATD: {
      type: String,
      default: null,
    },
    TypingTest: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default model("TestScore", TestScoreSchema);
