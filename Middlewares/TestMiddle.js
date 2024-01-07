import TestScoreSchema from "../Models/AnswerModal/TestScoreSchema.js";

export const SaveResult = async (userId, score, FieldName) => {
    try {
      const userRecord = await TestScoreSchema.findById(userId);
      if (userRecord) {
        const result = await TestScoreSchema.findByIdAndUpdate(userId, {
          $set: { [FieldName]: score },
        });
        return result;
      }
      const newUser = await TestScoreSchema.create({
        userId: userId,
        [FieldName]: score,
      });
      return newUser;
    } catch (error) {
      return error;
    }
  };
  