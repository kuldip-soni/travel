const express = require("express");

const { getcontect, addcontect, putcontect, delcontect } = require("../controller/contect.controller");
const upload = require("../middleware/upload");

const router = express.Router();

router.get('/getcontect', getcontect)

router.post('/addcontect',upload.single('contect_img'), addcontect)

router.put('/putcontect/:id',upload.single('contect_img'), putcontect)

router.delete('/delcontect/:id', delcontect)

module.exports = router; 