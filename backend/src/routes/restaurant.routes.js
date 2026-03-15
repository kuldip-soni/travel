const express = require("express");
const router = express.Router();

router.get('/getrestaurant', (req, res) => {
    res.send('Hello Node!')
})

router.post('/addrestaurant', (req, res) => {
    console.log(req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "restaurant is add sucessfuly"

    })

})

router.put('/putrestaurant/:id', (req, res) => {
    console.log(req.params.id, req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "restaurant is update sucessfuly"

    })

})

router.delete('/delrestaurant/:id', (req, res) => {
    console.log(req.params.id);

    res.status(200).json({
        sucess: true,
        data: null,
        message: "restaurant is delete sucessfuly"
    })

})

module.exports = router;  