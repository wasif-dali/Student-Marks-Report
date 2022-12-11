const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;

const studentschema = new mongoose.Schema({
  userid: 
  { 
    ref: "user", 
  type: objectid, 
  required: true },
  name: 
  { 
    type: String, 
    required: true 
  },
  subject: 
  { 
    type: String, 
    required: true 
  },
  marks: 
  { 
    type: Number, 
    required: true 
  },
     isdeleted: 
  {         
     type: Boolean, 
     default: false 
  },
  deletedAt: 
  { 
            type: Date 
  },
});

module.exports = mongoose.model("student", studentschema);
