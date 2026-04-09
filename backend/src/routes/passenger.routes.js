const express = require("express");
const upload = require("../middleware/upload");
const { getpassenger, addpassenger, putpassenger, delpassenger } = require("../controller/passenger.controller");
const router = express.Router();

router.get('/getPassenger', getpassenger)

router.post('/addPassenger', addpassenger)

router.put('/putPassenger/:id', putpassenger)

router.delete('/delPassenger/:id', delpassenger)

module.exports = router;  