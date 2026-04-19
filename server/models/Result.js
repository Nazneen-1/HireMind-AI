const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
{
  userId: String,
  answers: Array,
  score: Number
},
{ timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);