const express = require("express");
const { getservice, addservice, putservice, delservice } = require("../controller/service.controller");
const router = express.Router();

router.get('/getservice', getservice)

router.post('/addservice', addservice)

router.put('/putservice/:id', putservice)

router.delete('/delservice/:id', delservice)

module.exports = router;  