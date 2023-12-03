import { Schema, model } from "mongoose";

const ArticleSchema = new Schema({
  name: {
    type: String,
    // required: true,
    // unique:true
  },
  questions: [
    {
      text: {
        type: String,
        // required: true,
        // unique:true
      },
      options: {
        type: [
          {
            type: String,
            validate: {
              validator: function (v) {
                return v.length <= 4;
              },
              message: (props) =>
                `${props.value} exceeds the maximum limit of 4 options!`,
            },
          },
        ],
        required: true,
      },
      correctAnswer: {
        type: String,
        // required: true
      },
    },
  ],
});

export default model('Article', ArticleSchema)