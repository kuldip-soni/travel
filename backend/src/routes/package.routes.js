const express = require("express");
const { getpackage, addpackage, putpackage, delpackage } = require("../controller/package.controller");
const upload = require("../middleware/upload");
const router = express.Router();


router.get('/getpackage', getpackage)

router.post('/addpackage',upload.single('image'), addpackage)

router.put('/putpackage/:id',upload.single('image'), putpackage)

router.delete('/delpackage/:id', delpackage)

module.exports = router;  