const express = require("express");
const { getlocation, addlocation, putlocation, dellocation } = require("../controller/location.controller");
const upload = require("../middleware/upload");
const router = express.Router();

router.get('/getlocation', getlocation)

router.post('/addlocation',upload.single('image'), addlocation)

router.put('/putlocation/:id', putlocation)

router.delete('/dellocation/:id', dellocation)

module.exports = router;  