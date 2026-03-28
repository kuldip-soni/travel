const express = require("express");
const { bookpackage, getBooking } = require("../controller/bookpackage.controller");
// const { bookpackage } = require("../controller/booking.controller");
// const { getBooking } = require("../controller/bookpackage.controller");

const router = express.Router();



router.post('/bookpackage', bookpackage);

router.get("/getBooking", getBooking)



module.exports = router;  