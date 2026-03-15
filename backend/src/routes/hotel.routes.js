const express = require("express");
const router = express.Router();

router.get('/gethotel', (req, res) => {
    res.send('Hello Node!')
})

router.post('/addhotel', (req, res) => {
    console.log(req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "hotel is add sucessfuly"

    })

})

router.put('/puthotel/:id', (req, res) => {
    console.log(req.params.id, req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "hotel is update sucessfuly"

    })

})

router.delete('/delhotel/:id', (req, res) => {
    console.log(req.params.id);

    res.status(200).json({
        sucess: true,
        data: null,
        message: "hotel is delete sucessfuly"
    })

})

module.exports = router;  