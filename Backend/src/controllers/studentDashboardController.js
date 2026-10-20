const Application = require("../models/ApplicationSchema.js");
const Student = require("../models/StudentSchema.js")

exports.applyForPass = async(req , res)=>{
    try {
        const userId = req.user.id;
        const currentStudent = await Student.findOne({userId});
        if(!currentStudent){
            return res.status(404).json({
                success : false ,
                message : "Student not found"
            });
        }

        const applyPass = await Application.create({
            student : currentStudent._id
        });

        res.status(201).json({
            success : true ,
            message : "Apply pass successfully",
            data : applyPass
        });
        
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message
        })
    }
};
exports.Pass = async(req , res)=>{
    try {
        const userId = req.user.id;
        const currentStudent = await Student.findOne({userId});
        if(!currentStudent){
            return res.status(404).json({
                success : false ,
                message : "Student not found"
            });
        }

       const applications = await Application.find({ student :currentStudent._id}).populate();


        res.status(201).json({
            success : true ,
            message : "Apply pass successfully",
            data : applications
        });
        
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message
        })
    }
};




