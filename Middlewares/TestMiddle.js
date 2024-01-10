import TestScoreSchema from "../Models/AnswerModal/TestScoreSchema.js";

export const SaveResult = async (userId, score, FieldName) => {
  try {
    debugger;
    const userRecord = await TestScoreSchema.find({ userId });
    if (userRecord.length !== 0) {
      const result = await TestScoreSchema.findOneAndUpdate(
        { userId },
        {
          $set: { [FieldName]: score },
        }
      );
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
