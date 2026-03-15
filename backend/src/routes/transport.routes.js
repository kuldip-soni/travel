const express = require("express");
const router = express.Router();

router.get('/gettransport', (req, res) => {
    res.send('Hello Node!')
})

router.post('/addtransport', (req, res) => {
    console.log(req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "transport is add sucessfuly"

    })

})

router.put('/puttransport/:id', (req, res) => {
    console.log(req.params.id, req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "transport is update sucessfuly"

    })

})

router.delete('/deltransport/:id', (req, res) => {
    console.log(req.params.id);

    res.status(200).json({
        sucess: true,
        data: null,
        message: "transport is delete sucessfuly"
    })

})

module.exports = router;  