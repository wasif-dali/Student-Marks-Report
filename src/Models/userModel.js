



const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  name: 
  {
    type: String,
    require: true
  },
  password: 
  {
    type: String,
    require: true
  }
});

module.export = mongoose.model("user", userschema);
