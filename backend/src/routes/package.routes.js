const express = require("express");
const { getpackage, addpackage, putpackage, delpackage } = require("../controller/package.controller");
const router = express.Router();

router.get('/getpackage', getpackage)

router.post('/addpackage', addpackage)

router.put('/putpackage/:id', putpackage)

router.delete('/delpackage/:id', delpackage)

module.exports = router;  