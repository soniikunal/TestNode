import { Schema, model } from "mongoose";

const QuestionsSchema = new Schema({
  text: {
    type: String,
    // required:true
  },
  options: {
    type: [
      {
        type: String,
      },
    ],
    required: true,
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
  IsArticle: {
    type: Boolean,
    default: false,
  },
  IsDescriptive: {
    type: Boolean,
    default: false,
  },
  category: {
    name: Schema.Types.ObjectId,
    ref: "Category",
    // required:true
  },
});

// Conditionally include the articleId property based on the value of IsArticle
QuestionsSchema.add(
  {
    articleId: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  },
  "IsArticle"
);

// Conditionally include the descriptiveAnswer property based on the value of IsDescriptive
QuestionsSchema.add(
  {
    answer: {
      type: String,
      required: true,
    },
  },
  "IsDescriptive"
);

export default model("Question", QuestionsSchema);
