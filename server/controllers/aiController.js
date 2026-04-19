exports.getFeedback = async (req, res) => {
  try {
    const { answers } = req.body;

    let score = 0;

    answers.forEach((ans) => {
      if (ans.length > 80) score += 10;
      else if (ans.length > 30) score += 7;
      else if (ans.length > 10) score += 4;
      else score += 1;
    });

    let feedback = "";

    if (score >= 25) {
      feedback =
        "Excellent responses. Strong clarity and confidence.";
    } else if (score >= 18) {
      feedback =
        "Good answers. Add more detail and examples.";
    } else {
      feedback =
        "Needs improvement. Expand answers confidently.";
    }

    res.json({
      score,
      feedback
    });

  } catch (error) {
    res.status(500).json({
      message: "AI feedback error"
    });
  }
};