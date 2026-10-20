const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User" ,
        required : true ,
        unique : true
    },
    name : {type : String , required : true , trim : true} , 
    phone : {type : Number , required : true} , 
    rollNo : {type : String , required : true , unique : true } ,
    eligibilityStatus : {type : Boolean , default : true} , 
    department : {type : String , 
        enum : ["Engineering" , "Management" , "Health and Nursing"]
    } 
}, {timestamps : true});

module.exports=  mongoose.model("Student" , studentSchema);
