const express = require("express");
const router = express.Router();

router.get('/getblog', (req, res) => {
    res.send('Hello Node!')
})

router.post('/addblog', (req, res) => {
    console.log(req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "blog is add sucessfuly"

    })

})

router.put('/putblog/:id', (req, res) => {
    console.log(req.params.id, req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "blog is update sucessfuly"

    })

})

router.delete('/delblog/:id', (req, res) => {
    console.log(req.params.id);

    res.status(200).json({
        sucess: true,
        data: null,
        message: "blog is delete sucessfuly"
    })

})

module.exports = router;  