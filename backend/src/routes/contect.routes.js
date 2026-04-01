const express = require("express");

const { getcontect, addcontect, putcontect, delcontect } = require("../controller/contect.controller");
const upload = require("../middleware/upload");

const router = express.Router();

router.get('/getcontect', getcontect)

router.post('/addcontect',addcontect)

router.put('/putcontect/:id', putcontect)

router.delete('/delcontect/:id', delcontect)

module.exports = router; 