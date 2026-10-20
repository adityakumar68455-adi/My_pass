require('dotenv').config(); 
const express = require("express");
const connectDb = require("./DataBaseConnect")
const cors = require("cors")
const app = express();
connectDb()

app.use(cors({
  origin:'http://localhost:5173' ,
  credentials: true 
}))
app.use(express.json());


// Routes 
const authRoutes = require("./routes/authRoutes.js")
const studentRoutes = require("./routes/studentRoutes.js")
const studentDashboardRoutes = require("./routes/studentDashboardRoutes.js")
const hodRoutes = require("./routes/hodRoutes.js")
const hodDashboardRoute = require("./routes/hodDashboardRoutes.js")

app.use("/api/auth",authRoutes);
app.use("/api/student" , studentRoutes);
app.use("/api/dashboard", studentDashboardRoutes);
app.use("/api/hod", hodRoutes);
app.use("/api/dashboard" , hodDashboardRoute);







app.get("/", (req , res)=>{
    res.json({
      "message":  "Hello from backend"
    })
})

module.exports = app;