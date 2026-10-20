const express = require("express");
const router = express.Router();

const {applyForPass , Pass} = require("../controllers/studentDashboardController.js");
const {protect , authorizeRoles} = require("../middlewares/middlewares.js");


router.post("/apply" ,protect,authorizeRoles("student"), applyForPass);
router.get("/pass" ,protect,authorizeRoles("student"), Pass);


module.exports = router;