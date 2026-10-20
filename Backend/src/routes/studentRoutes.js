const express = require("express");
const router = express.Router();

const {createStudentProfile , readStudentProfile , UpdateStudentProfile} = require("../controllers/studentController");
const {protect , authorizeRoles} = require("../middlewares/middlewares.js");


router.post("/create" , protect , authorizeRoles("student"), createStudentProfile);
router.get("/read" , protect , authorizeRoles("student"), readStudentProfile);
router.put("/update" , protect , authorizeRoles("student"),UpdateStudentProfile);

module.exports = router;