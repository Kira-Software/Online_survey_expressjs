const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Surveyquestion = require("../models/survey");
const answermodel = require("../models/answermodel");

router.get("/", auth, async (req, res) => {
  try {
    // console.log("in the giveme gender of the user is", req.user.gender);
    const isthere = await answermodel.find().sort({posteddate : -1});

    if (!isthere) {
      res.status(400).json({ msg: "there is no answer servey for this user" });
    }

    res.json(isthere);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
