const mongoose =require('mongoose')
const marksSchema =new mongoose.marksSchema({
    student:String,
    subject:{
        type:String,
        enum:subjects,
    }

    marks:{
        type:Number,
        require:true,

    },
    user:{
        type:ObjectId,
        
    }
})