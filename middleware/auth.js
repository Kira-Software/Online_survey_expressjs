const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const auth = function(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({
      message: "there is no token, authorization is denied"
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;

    // console.log("in the middleware the job of user is ",req.user.job);
    next();
  } catch (err) {
    res.status(401).json({
      message: "token is not valid, authorization is denied"
    });
  }
};
module.exports = auth;
