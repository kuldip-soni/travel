const express = require("express");
const router = express.Router();

router.get('/getservice', (req, res) => {
    res.send('Hello Node!')
})

router.post('/addservice', (req, res) => {
    console.log(req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "service is add sucessfuly"

    })

})

router.put('/putservice/:id', (req, res) => {
    console.log(req.params.id, req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "service is update sucessfuly"

    })

})

router.delete('/delservice/:id', (req, res) => {
    console.log(req.params.id);

    res.status(200).json({
        sucess: true,
        data: null,
        message: "service is delete sucessfuly"
    })

})

module.exports = router;  