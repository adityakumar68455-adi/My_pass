const Student = require("../models/StudentSchema.js");

exports.createStudentProfile = async (req , res)=>{
    try {
        const userId = req.user.id;

        const existingStudent = await Student.findOne({userId});
        if(existingStudent){
            return res.status(400).json({
                success : false ,
                message : "Student profile already exists"
            })
        };

        const {name , rollno , phone , department } = req.body;
        if(!name || !rollno || !phone || !department){
            return res.status(400).json({
                success : false ,
                message : "All details must be present"
            })
        };
        const newStudent = await Student.create({
            user : userId ,
            name ,
            rollno ,
            phone ,
            department
        });

        res.status(201).json({
            success : true ,
            message : "Student profile created successful" ,
            data : newStudent
        })
    } catch (error) {
        console.log("Error creating student profile" , error.message);
        res.status(500).json({
            success : false ,
            message : "Error creating student profile"
        });
    }
};


exports.readStudentProfile = async (req , res)=>{
    try {
        const userId = req.user.id;
        const readProfile = await Student.findOne({userId}).populate
        if(!readProfile){
            return res.status(404).json({
                success : false ,
                message : "Profile not found"
            });
        }
        res.status(201).json({
            success : true ,
            data : readProfile
        });

    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message
        });
    }
};

exports.UpdateStudentProfile = async(req , res)=>{
    try {
        const userId = req.user.id;
        const student = await Student.findOne({userId});
        if(!student){
            return res.status(404).json({
                success : false ,
                message : "Profile not found"
            });
        }

        const {name , phone , rollno , department} = req.body;
        if(name) student.name = name;
        if(phone) student.phone = phone;
        if(rollno) student.rollno = rollno;
        if(department) student.department = department;

        const updateStudent = await student.save();

        res.status(201).json({
            success : true ,
            message : "Updated Successfully",
            data : updateStudent
        });


    } catch (error) {
        console.log("Error during Updating student profile");
        res.status(500).json({
            success : false , 
            message : error.message
        });
    }
}