const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const cors = require("cors");
const userroute = require("./api/users");
const authroute = require("./api/authroute");
const surveyroute = require("./api/surveyroute");
const givemesurvey = require("./api/givemesurvey");
const postchoice = require("./api/postchoice");
const issubmitted = require("./api/issubmitted");
const updateprofile = require("./api/updateprofile");
const deletesurvey = require("./api/deletesurvey");
// const myrouter=require('./api/users');
dotenv.config({ path: "../config.env" });

const app = express();
app.use(express.json());
// app.use(cors({ 
//   origin: "https://63160dd2d8aeff6ffc33fc6b--creative-dusk-bceed1.netlify.app/", 
//   credentials: true 
//  }));
console.log(process.env.DATABASE_LOCAL);

app.use("/api/user", userroute);
app.use("/api/auth", (req,res) => res.status(200).json({message: "success", data: req.body}));
app.use("/api/survey", surveyroute);
app.use("/api/givemesurvey", givemesurvey);
app.use("/api/postchoice", postchoice);
app.use("/api/issubmitted", issubmitted);
app.use("/api/updateprofile", updateprofile);
app.use("/api/deletesurvey", deletesurvey);

app.use("/", (req, res) => res.send("helow this is from the root directory"));

mongoose
  .connect(process.env.DATABASE_ATLAS, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("the database connection is successful");
  });

app.listen(process.env.PORT, () => {
  console.log("the server is listening on port 7000...");
});
