const express = require("express");
const router = express.Router();

const {
  saveResult
} = require("../controllers/resultController");

router.post("/save", saveResult);

module.exports = router;