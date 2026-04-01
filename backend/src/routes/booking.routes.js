const express = require("express");
const { bookpackage, getBooking, getmyBooking } = require("../controller/bookpackage.controller");
// const { bookpackage } = require("../controller/booking.controller");
// const { getBooking } = require("../controller/bookpackage.controller");

const router = express.Router();



router.post('/bookpackage', bookpackage);

router.get("/getBooking", getBooking)

router.get('/getmyBooking/:user_id', getmyBooking)



module.exports = router;  