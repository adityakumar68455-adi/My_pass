const application = require("../models/ApplicationSchema.js");

exports.getAllApplication = async (req , res)=>{
    try {
        const applications = await application.find()
        .populate("student" , "name email rollno department");

        return res.status(201).json({
            success :  true ,
            message : "Get all application successfully" ,
            data :  applications
        })
    } catch (error) {
        console.log("Error during fetch application");
        return res.status(500).json({
            success : false ,
            message : error.message
        })
    }
};

exports.updateApplication = async(req , res)=>{
    try {
        const {applicationId} = req.prams;
        const {status} = req.body;
        const validStatus = [
            "approved" ,
            "rejected"
        ];

        if(!validStatus.includes(status)){
            return res.status(400).json({
                success : false ,
                message : "Invalid status"
            })
        };
        
        const Application = await application.findById({applicationId});
        if(!Application){
            return res.status(404).json({
                success : false ,
                message : "Application not found"
            })
        }

        Application.status = status;
        Application.timeline.push({
            status : status ,
            updatedAt : new Date()
        })
        await Application.save();

        return res.status(201).json({
            success : true ,
            message :"Application status updated successfully"
        }) ;
    } catch (error) {
        console.log("Error during application update");
       return res.status(500).json({
        success : false ,
        message :  error.message
       });
    }
    };