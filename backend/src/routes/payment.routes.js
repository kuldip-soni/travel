const express = require("express");
const {addPayment, getPayment, putPayment} = require("../controller/payment.controller");

const router = express.Router();



router.post('/addPayment', addPayment);

router.get("/getPayment", getPayment)

router.put("/putPayment/:id", putPayment)

module.exports = router;  
