const express = require("express");
const { getblog, addblog, putblog, delblog } = require("../controller/blog.controller");
const upload = require("../middleware/upload");
const router = express.Router();

router.get('/getblog', getblog)

router.post('/addblog',upload.single('blog_img'), addblog)

router.put('/putblog/:id',upload.single('blog_img'), putblog)

router.delete('/delblog/:id', delblog)

module.exports = router;  