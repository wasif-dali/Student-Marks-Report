const express = require('express');
const router = express.Router();
const { registration, userlogin } = require("../controller/usercontroller")
const { createstudent,getstudent,findstudent,updatestudent, deletestudent } = require("../controller/studentcontroller")
const { authentication, authorization } = require("../middleware/auth")

router.post("/register", registration)
router.post("/login", userlogin)
router.post("/createstudent/:userid", authentication, authorization, createstudent)
router.get("/getstudent/:userid",getstudent)
router.get("/getstudent",findstudent)
router.put("/updatestudent/:userid/:studentid", authentication, authorization, updatestudent)
router.delete("/deletestudent/:userid/:studentid", authentication, authorization, deletestudent)
module.exports = router;