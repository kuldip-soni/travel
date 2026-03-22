const express = require("express");
const { getitineary, additineary, putitineary, delitineary } = require("../controller/itineary.controller");
const upload = require("../middleware/upload");
const router = express.Router();

router.get('/getitineary', getitineary)

router.post('/additineary',upload.single('itineary_img'), additineary)

router.put('/putitineary/:id',upload.single('itineary_img'), putitineary)

router.delete('/delitineary/:id', delitineary)

module.exports = router;  