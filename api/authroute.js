const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const { check, validationResult } = require("express-validator");
// const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "there is a problem on the server"
    });
  }
});

router.post(
  "/",
  [
    check("username", "the username is required")
      .not()
      .isEmpty(),
    check("password", "password should be present").isLength({ min: 1 })
  ],
  async (req, res) => {zz
    const errors = validationResult(req);
    // console.log("the errors of validation result is",errors);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username }, {$exists: true}).toArray(function(err, docs) {
        if (docs.length < 0) {
          res.status(400).json({ errors: [{ msg: "INVALID CREDENTIALS" }] });

        }
        else {
          const ismatch = await bcrypt.compare(password, user.password);

              if (!ismatch) {
                res.status(400).json({ errors: [{ msg: "INVALID CREDENTIALS" }] });
              }
              const payload = {
                user: {
                  id: user.id,
                  // username: user.username,
                  // job: user.job,
                  // gender: user.gender,
                  // birthdate: user.birthdate
                }
              };

              console.log("the value of payload in the middleware is ", payload);

              jwt.sign(
                payload,
                process.env.JWTSECRET,
                { expiresIn: 360000 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    message: "token genetated successfully",
                    token: token
                  });
                }
              );
        }
      });

      // if (!user) {
      //   res.status(400).json({ errors: [{ msg: "INVALID CREDENTIALS" }] });
      // }

   

      // console.log(req.body);
      // res.send("User is registerd successfully");
    } catch (err) {
      res.status(500).json({ status: "server error", message: err });
    }
  }
);

module.exports = router;
