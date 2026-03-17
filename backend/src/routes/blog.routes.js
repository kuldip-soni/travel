const express = require("express");
const { getblog, addblog, putblog, delblog } = require("../controller/blog.controller");
const router = express.Router();

router.get('/getblog', getblog)

router.post('/addblog', addblog)

router.put('/putblog/:id', putblog)

router.delete('/delblog/:id', delblog)

module.exports = router;  