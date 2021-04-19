const express = require("express");
// const routehandlers = require("../routehandler");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post(
  "/",
  [
    check("username", "the username is required")
      .not()
      .isEmpty(),
    check("gender", "gender is required")
      .not()
      .isEmpty(),
    check("job", "job is required")
      .not()
      .isEmpty(),
    check("birthdate", "BD is required")
      .not()
      .isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password should be present and min of 6").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { username, gender, job, birthdate, age,email, password ,image} = req.body;

    try {
      let user = await User.findOne({ username });

      if (user) {
        errors=[{msg:"this user is already exists"}];
        res.status(400).json({ errors: errors });
      }

      user = new User({
        username,
        gender,
        job,
        birthdate,
        age,
        email,
        password,
        image
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

     // user={...user,"age":`${Date.now()} - ${birthdate}`}
    //  console.log("the age of the user is ",Date.now() -  user.birthdate );

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

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

      // console.log(req.body);
      // res.send("User is registerd successfully");
    } catch (err) {
      res.status(500).json({ status: "server error", message: err });
    }
  }
);

module.exports = router;
