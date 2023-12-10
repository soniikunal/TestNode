import { Schema, model } from "mongoose";
import { generateUniqueCode } from "../../Middlewares/middle";

const QuestionsSchema = new Schema({
  question: {
    type: String,
    // required:true
  },
  uniqueCode: {
    type: String,
    default: generateUniqueCode,
    unique: true,
  },
  options: {
    type: [
      {
        type: String,
      },
    ],
    // required: true,
    required: function () {
      return !this.IsDescriptive;
    },
    validate: {
      validator: function (v) {
        return v.length <= 4;
      },
      message: (props) =>
        `${props.value} exceeds the maximum limit of 4 options!`,
    },
  },
  correctAnswer: {
    type: String,
    // required: true
  },
  //   difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  IsDescriptive: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    // name: Schema.Types.ObjectId,
    // ref: "Category",
    // required:true
  },
  answer: {
    type: String,
    required: function () {
      return this.IsDescriptive;
    },
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

export default model("Question", QuestionsSchema);
