const Result = require("../models/Result");

exports.saveResult = async (req, res) => {
  try {
    const { userId, answers, score } = req.body;

    await Result.create({
      userId,
      answers,
      score
    });

    res.json({
      message: "Result saved"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};