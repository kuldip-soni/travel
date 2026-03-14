const express = require("express");
const router = express.Router();

router.get('/getlocation', (req, res) => {
    res.send('Hello Node!')
})

router.post('/addlocation', (req, res) => {
    console.log(req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "loaction is add sucessfuly"

    })

})

router.put('/putlocation/:id', (req, res) => {
    console.log(req.params.id, req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "loaction is update sucessfuly"

    })

})

router.delete('/dellocation/:id', (req, res) => {
    console.log(req.params.id);

    res.status(200).json({
        sucess: true,
        data: null,
        message: "location is delete sucessfuly"
    })

})

module.exports = router;  