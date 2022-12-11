const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  name: 
  {
    type: String,
    reuqire: true
  },
  password: 
  {
    type: String,
    reuqire: true
  }
});

module.export = mongoose.model("user", userschema);
