const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email : {
        type : String ,
        required : true ,
        unique : true
    }
    ,
    rollno :{
        type:String ,
        required : true ,
        unique : true
    } , 
    password :{
        type:String ,
        required : true ,
        unique : true
    } , 
    role :{
        type:String ,
        enum :["hod" , "student" , "admin"],
        default : "student"
    } 
    
},{timestamps : true});


module.exports = mongoose.model("User" , userSchema);