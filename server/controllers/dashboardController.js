const Result = require("../models/Result");

exports.getStats = async (req, res) => {
  try {
    const { userId } = req.params;

    const results = await Result.find({ userId }).sort({
      createdAt: -1
    });

    const totalInterviews = results.length;

    const highestScore =
      results.length > 0
        ? Math.max(...results.map(r => r.score))
        : 0;

    const latestScore =
      results.length > 0
        ? results[0].score
        : 0;

    res.json({
      totalInterviews,
      highestScore,
      latestScore
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};