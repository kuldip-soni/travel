const express = require("express");
const { getroom, addroom, putroom, delroom } = require("../controller/room.controller");
const router = express.Router();

router.get('/getroom', getroom)

router.post('/addroom',upload.single('room_img'),  addroom)

router.put('/putroom/:id',upload.single('room_img'),  putroom)

router.delete('/delroom/:id', delroom)

module.exports = router;  