const mongoose  = require('mongoose');

var jobPostSchema = new mongoose.Schema({
  title:String,
  skills:String,
  startExperience:Number,
  endExperience: Number,
  salary:Number,
  author:{
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("job", jobPostSchema)
