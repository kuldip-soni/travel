const express = require("express");

const { gettransport, addtransport, puttransport, deltransport } = require("../controller/transport.controller");

const router = express.Router();

router.get('/gettransport', gettransport)

router.post('/addtransport', addtransport)

router.put('/puttransport/:id', puttransport)

router.delete('/deltransport/:id', deltransport)

module.exports = router;  