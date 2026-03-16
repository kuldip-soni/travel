const express = require("express");
const { getitineary, additineary, putitineary, delitineary } = require("../controller/itineary.controller");
const router = express.Router();

router.get('/getitineary', getitineary)

router.post('/additineary', additineary)

router.put('/putitineary/:id', putitineary)

router.delete('/delitineary/:id', delitineary)

module.exports = router;  