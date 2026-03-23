const express = require("express");
const { getservice, addservice, putservice, delservice } = require("../controller/service.controller");
const router = express.Router();
const upload = require("../middleware/upload");

router.get('/getservice', getservice)

router.post('/addservice',upload.single('service_img'), addservice)

router.put('/putservice/:id',upload.single('service_img'), putservice)

router.delete('/delservice/:id', delservice)

module.exports = router;  