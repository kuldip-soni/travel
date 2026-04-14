const express = require("express");
const upload = require("../middleware/upload");
const { getrecentBooking, getdashboard, locationWisePayment, monthWiseRevenue } = require("../controller/deshboard.controller");
const router = express.Router();


router.get('/getdashboard', getdashboard)
router.get('/getrecentBooking',getrecentBooking)
router.get('/locationWisePayment',locationWisePayment)
router.get('/monthWiseRevenue',monthWiseRevenue)


module.exports = router; 