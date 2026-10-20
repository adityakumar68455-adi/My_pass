const mongoose = require("mongoose");

const connectDb = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("You are connected to the database")
    } catch (error) {
        console.error("DB error" , error.message)
    }
}
module.exports = connectDb;