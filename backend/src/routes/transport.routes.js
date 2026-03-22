const express = require("express");

const { gettransport, addtransport, puttransport, deltransport } = require("../controller/transport.controller");
const upload = require("../middleware/upload");

const router = express.Router();

router.get('/gettransport', gettransport)

router.post('/addtransport',upload.single('transport_img'), addtransport)

router.put('/puttransport/:id',upload.single('transport_img'), puttransport)

router.delete('/deltransport/:id', deltransport)

module.exports = router;  