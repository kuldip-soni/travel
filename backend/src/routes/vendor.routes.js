const express = require("express");
const router = express.Router();

router.get('/getvendor', (req, res) => {
    res.send('Hello Node!')
})

router.post('/addvendor', (req, res) => {
    console.log(req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "vendor is add sucessfuly"

    })

})

router.put('/putvendor/:id', (req, res) => {
    console.log(req.params.id, req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "vendor is update sucessfuly"

    })

})

router.delete('/delvendor/:id', (req, res) => {
    console.log(req.params.id);

    res.status(200).json({
        sucess: true,
        data: null,
        message: "vendor is delete sucessfuly"
    })

})

module.exports = router;  