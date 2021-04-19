const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/", auth, async (req, res) => {
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   res.status(400).json({ errors: errors.array() });
  // }

  console.log(req.body);
  const { username, gender, job, birthdate, email, password } = req.body;

  upuser = {};

  if (username) upuser.username = username;
  if (gender) upuser.gender = gender;
  if (job) upuser.job = job;
  if (birthdate) upuser.birthdate = birthdate;
  if (email) upuser.email = email;
  if (password) upuser.password = password;

  try {
    //let user = await User.findOne({ _id: req.user.id });

   // if (user) {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        upuser.password = await bcrypt.hash(password, salt);
      }

      user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: upuser },
        { new: true }
      );

      res.json(upuser);
  //  }

    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "server error", message: err });
  }
});

module.exports = router;
