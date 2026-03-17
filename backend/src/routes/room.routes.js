const express = require("express");
const { getroom, addroom, putroom, delroom } = require("../controller/room.controller");
const router = express.Router();

router.get('/getroom', getroom)

router.post('/addroom', addroom)

router.put('/putroom/:id', putroom)

router.delete('/delroom/:id', delroom)

module.exports = router;  