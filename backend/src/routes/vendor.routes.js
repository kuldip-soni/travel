const express = require("express");

const { getvendor, addvendor, putvendor, delvendor } = require("../controller/vendor.controller");

const router = express.Router();

router.get('/getvendor', getvendor)

router.post('/addvendor', addvendor)

router.put('/putvendor/:id', putvendor)

router.delete('/delvendor/:id', delvendor)

module.exports = router;  