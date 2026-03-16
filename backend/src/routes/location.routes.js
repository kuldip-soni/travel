const express = require("express");
const { getlocation, addlocation, putlocation, dellocation } = require("../controller/location.controller");
const router = express.Router();

router.get('/getlocation', getlocation)

router.post('/addlocation', addlocation)

router.put('/putlocation/:id', putlocation)

router.delete('/dellocation/:id', dellocation)

module.exports = router;  