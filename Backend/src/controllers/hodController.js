const hod = require("../models/HodSchema.js");

exports.createHodProfile = async(req , res) =>{
    try {
        const userId = req.user.id;

        const Hod = await hod.findOne({userId});
        if(!Hod){
            return res.status(404).json({
                success : false ,
                message : "User not found"
            })
        };

        const {name , phone , department} = req.body;

        if(!name || !phone ||!department ){
            return res.status(400).json({
                success : false ,
                message : "All details must be present"
            })
        };

        const newHod = await hod.create({
            user : userId ,
            name ,
            phone ,
            department 
        })

        res.status(201).json({
            success : true ,
            message : "Profile created successfully ",
            data : newHod
        })

    } catch (error) {
        console.log("Error during Profile creating ")
        res.status(500).json({
            success :  false ,
            message : error.message
        })
    }
};

exports.readHodProfile = async(req,res)=>{
    try {
        const userId = req.user.id;

        const Hod = await hod.findOne({userId}).populate();
        if(!Hod){
            return res.status(404).json({
                success : false ,
                message : "Profile not found" 
            })
        }
        return res.status(201).json({
            success : true ,
            message :"Hod profile  found " ,
            data : Hod
        })
    } catch (error) {
        console.log("Error during reading profile" , error.message);
        return res.status(500).json({
            success : false ,
            message : error.message
        })
    }
};

exports.updateHodProfile = async(req , res)=>{
    try {
        const userId = req.user.id;
        const Hod = await hod.findOne({userId});
        if(!Hod){
            return res.status(404).json({
                success : false ,
                message : "Profile not found"
            })
        }
        const {name , phone , department} = req.body;
        if(name) Hod.name = name ;
        if(phone) Hod.phone = phone;
        if(department) Hod.department = department;

        const updatedHod = await Hod.save();

        
        return res.status(201).json({
            success : true ,
            message : "Profile Updated successfully" ,
            data : updatedHod

        });


    } catch (error) {
        console.log("Error during profile update");
        return res.status(500).json({
            success : false ,
            message : error.message
        })
    }
}