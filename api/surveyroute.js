const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Surveyquestion = require("../models/survey");
const user = require("../models/user");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    auth,
    [
      check("minage", "minimum age is required")
        .not()
        .isEmpty(),
      check("maxage", "max age is required")
        .not()
        .isEmpty(),
      check("job", "job is required")
        .not()
        .isEmpty(),
      check("gender", "gender is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { title, minage, maxage, job, gender, myquestion,posteddate } = req.body;

    try {
      const data = { title, minage, maxage, job, gender, myquestion,posteddate };
      data.user = req.user.id;
      console.log("the data is ", data);

      survey = new Surveyquestion(data);

      await survey.save();

      res.json(survey);

      // console.log(req.body);
      // res.send("User is registerd successfully");
    } catch (err) {
      res.status(500).json({ status: "server error", message: err });
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const survey = await Surveyquestion.find({
      user: req.user.id
    }).sort({ posteddate: -1 });

    if (!survey) {
      res.status(400).json({ msg: "there is no survey by this user" });
    }

    res.json(survey);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("server error");
  }
});

module.exports = router;
