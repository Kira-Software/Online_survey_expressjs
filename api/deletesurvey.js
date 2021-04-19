const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Surveyquestion = require("../models/survey");

router.get("/:id", auth, async (req, res) => {
  try {
    console.log("in the id of the deleted question is", req.params.id);
   const survey=  await Surveyquestion.findByIdAndDelete(req.params.id);

    res.json(survey);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
