const express = require("express");

const { getvendor, addvendor, putvendor, delvendor } = require("../controller/vendor.controller");
const upload = require("../middleware/upload");

const router = express.Router();

router.get('/getvendor', getvendor)

router.post('/addvendor',upload.single('vendor_img'), addvendor)

router.put('/putvendor/:id',upload.single('vendor_img'), putvendor)

router.delete('/delvendor/:id', delvendor)

module.exports = router;  