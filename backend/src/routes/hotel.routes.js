const express = require("express");

const { gethotel, addhotel, puthotel, delhotel } = require("../controller/hotel.controller");

const router = express.Router();

router.get('/gethotel', gethotel)

router.post('/addhotel', addhotel)

router.put('/puthotel/:id', puthotel)

router.delete('/delhotel/:id', delhotel)

module.exports = router;  