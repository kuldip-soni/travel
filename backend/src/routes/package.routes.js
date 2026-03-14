const express = require("express");
const router = express.Router();

router.get('/getpackage', (req, res) => {
    res.send('Hello Node!')
})

router.post('/addpackage', (req, res) => {
    console.log(req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "package is add sucessfuly"

    })

})

router.put('/putpackage/:id', (req, res) => {
    console.log(req.params.id, req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "package is update sucessfuly"

    })

})

router.delete('/delpackage/:id', (req, res) => {
    console.log(req.params.id);

    res.status(200).json({
        sucess: true,
        data: null,
        message: "package is delete sucessfuly"
    })

})

module.exports = router;  

