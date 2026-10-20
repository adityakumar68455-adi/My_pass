const express = require("express");
const router = express.Router();

const {getAllApplication , updateApplication} = require("../controllers/hodDashboardController");
const {protect , authorizeRoles} = require("../middlewares/middlewares.js")

router.get("/application" ,protect , authorizeRoles("hod"), getAllApplication);
router.put("/update" ,protect , authorizeRoles("hod"),updateApplication);

module.exports = router;
