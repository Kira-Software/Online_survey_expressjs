const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const answermodel = require("../models/answermodel");
const user = require("../models/user");
const { check, validationResult } = require("express-validator");

router.post("/:id", auth, async (req, res) => {
  //   const errors = validationResult(req);

  //   if (!errors.isEmpty()) {
  //     res.status(400).json({ errors: errors.array() });
  //   }
  console.log(req.body);
  const { mychoice } = req.body;

  try {
    const data = { mychoice };
    // data.user = req.user.id;
    data.uname = req.user.username;
    data.qid = req.params.id;

    console.log("the data is ", data);

    survey = new answermodel(data);

    await survey.save();

    res.json(survey);

    // console.log(req.body);
    // res.send("User is registerd successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "server error", message: err });
  }
});

// router.get("/:id", auth, async (req, res) => {
//     try {
//       const survey = await Surveyquestion.find({
//         user: req.user.id
//       }).sort({ posteddate: -1 });
  
//       if (!survey) {
//         res.status(400).json({ msg: "there is no survey by this user" });
//       }
  
//       res.json(survey);
//     } catch (err) {
//       console.error(err.message);
//       res.status(400).send("server error");
//     }
//   });

module.exports = router;
