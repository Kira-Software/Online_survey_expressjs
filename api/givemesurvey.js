const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Surveyquestion = require("../models/survey");

router.get("/", auth, async (req, res) => {
  try {
    const age =
      new Date(Date.now()).getFullYear() -
      new Date(req.user.birthdate).getFullYear();

    console.log("in the giveme age of the user is", age);
    const survey = await Surveyquestion.find({
      //gender: { $eq: req.user.gender }
      maxage: { $gte: age },
      minage: { $lte: age },
      // job: { $eq: req.user.job },
      // $or: [{ gender: { $eq: req.user.gender } }, { gender: { $eq: "both" } }]
    }).sort({ posteddate: -1 });

    if (!survey) {
      res.status(400).json({ msg: "there is no servey for this user" });
    }

    res.json(survey);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
