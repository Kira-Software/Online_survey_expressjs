const mongoose = require("mongoose");
//const user =require("./user");

const surveyschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title:{
    type:String,
    required:true
  },
  minage: {
    type: Number,
    required: true
  },
  maxage: {
    type: Number,
    required: true
  },
  job:{
      type:String,
      required: true
  },
  gender:{
    type:String,
    required:true
  },
  posteddate: {
    type: Date,
    default: Date.now()
  },
  myquestion:{
      type:[Array] 
  }
});

const Surveyquestion = mongoose.model("questions",surveyschema);

module.exports = Surveyquestion;
