const mongoose = require("mongoose");

const answerschema = new mongoose.Schema({
    qid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Surveyquestion"
    },
    uname:{
        type:String
        
    },
    mychoice:{
        type:[Array] 
    },
    posteddate: {
      type: Date,
      default: Date.now()
    }
});

const answermodel = mongoose.model("answers", answerschema);
module.exports= answermodel;
