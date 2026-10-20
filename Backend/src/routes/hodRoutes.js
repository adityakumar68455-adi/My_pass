const express = require("express");
const router = express.Router();

const {createHodProfile , readHodProfile , updateHodProfile} = require("../controllers/hodController.js");
const {protect , authorizeRoles} = require("../middlewares/middlewares.js")


router.post("/create" ,protect , authorizeRoles("hod") ,createHodProfile);
router.get("/read" ,protect , authorizeRoles("hod") , readHodProfile);
router.put("/update" ,protect , authorizeRoles("hod"), updateHodProfile);

module.exports = router;
