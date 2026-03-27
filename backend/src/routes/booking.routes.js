const express = require("express");
const { bookpackage } = require("../controller/booking.controller");

const router = express.Router();



router.post('/bookpackage', bookpackage);



module.exports = router;  