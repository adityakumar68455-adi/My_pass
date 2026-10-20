const User = require("../models/UserSchema.js");
const Student = require("../models/StudentSchema.js");
const Hod = require("../models/HodSchema.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.register = async (req , res)=>{
    try {
        let {email , rollno , password , role} = req.body;

        if(!email || !rollno || !password || !role ){
            return res.status(400).json({message : "All details must be present " , success :false })
        };
        const allowedRole = ["student" , "hod"];

        if(role === "admin"){
            return res.status(403).json({
                message : "Admin cannot register publicly" , 
                success : false 
            })
        }

        if(!allowedRole.includes(role)){
            return res.status(400).json({
                message : "Invalid role" , 
                success : false 
            })
        }
        email = email.trim().toLowerCase();

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 
            success: false, 
            message: 'Please enter a valid email address.' 
            });
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message : "Already Present" ,
                success : false 
            })
        }

        if(password.length < 8){
            return res.status(400).json({success:false ,message: "Min password length should be 8"})
        }

        const hashedPassword = await bcrypt.hash(password , 12)

        const user = await User.create({
            email,
            rollno ,
            password : hashedPassword ,
            role
        })

        const userResponse = {_id : user._id , rollno : user.rollno ,  role : user.role , }

        res.status(201).json({
            success : true ,
            message : "User create successful" ,
            userResponse : userResponse
        })

    } catch (error) {
        console.log("Register Error" , error.message)
        res.status(500).json({
            message :error.message
        }) 

    }
}


exports.login = async (req , res)=>{
    try {
        let {email , password} = req.body;
        if (typeof email === "string") {
    email = email.trim().toLowerCase();
}
        if(!email || !password){
            return res.status(400).json({
                success : false ,
                message : "All details must be present"
            })
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
            success : false ,
            message : "Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(password , user.password )
        if(!isMatch){
           return res.status(400).json({
                success : false ,
                message : "Invalid credentials"
            })
        }

        const hasProfile = false 
        

        // if(role === "student"){
        //     const studentExist = await Student.findOne({user : user._id})
        //     if(studentExist){
        //         hasProfile = true
        //     }
        // }
        // if(role === "hod"){
        //     const hodExist = await Hod.findOne({user: user._id})
        //     if(hodExist){
        //         hasProfile = true
        //     }
        // }

        const token = jwt.sign(
            {id : user._id , role : user.role , hasProfile} ,
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        const userResponse = {
            _id : user._id ,
            email : user.email ,
            role : user.role  ,
            hasProfile 

        }

        return res.status(200).json({
            success : true ,
            message : "login successfully" ,
            token ,
            user : userResponse
        })
    } catch (error) {
        console.log("Error during login execution" , error.message);
         res.status(500).json({
            success : false , message : error.message
        })

    }
};

