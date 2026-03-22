const express = require("express");

const { gethotel, addhotel, puthotel, delhotel } = require("../controller/hotel.controller");
const upload = require("../middleware/upload");

const router = express.Router();

router.get('/gethotel', gethotel)

router.post('/addhotel',upload.single('hotel_img'), addhotel)

router.put('/puthotel/:id',upload.single('hotel_img'), puthotel)

router.delete('/delhotel/:id', delhotel)

module.exports = router;  