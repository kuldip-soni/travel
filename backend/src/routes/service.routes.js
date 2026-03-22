const express = require("express");
const { getservice, addservice, putservice, delservice } = require("../controller/service.controller");
const router = express.Router();

router.get('/getservice', getservice)

router.post('/addservice',upload.single('vendor_img'), addservice)

router.put('/putservice/:id',upload.single('vendor_img'), putservice)

router.delete('/delservice/:id', delservice)

module.exports = router;  