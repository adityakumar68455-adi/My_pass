const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    student :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required : true 
    } ,
    hod : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Hod",
        required : true
    } , 
    status :{
        type : String ,
        enum : ["pending" ,"approved" , "rejected" ],
        default : "pending"
    }
    ,
      timeline: [
        {
            status: { type: String },
            updatedAt: { type: Date, default: Date.now }
        }]
}, {timestamps : true});


module.exports = mongoose.model("Application" , applicationSchema)