const express = require("express");
const router = express.Router();

router.get('/getroom', (req, res) => {
    res.send('Hello Node!')
})

router.post('/addroom', (req, res) => {
    console.log(req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "room is add sucessfuly"

    })

})

router.put('/putroom/:id', (req, res) => {
    console.log(req.params.id, req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "room is update sucessfuly"

    })

})

router.delete('/delroom/:id', (req, res) => {
    console.log(req.params.id);

    res.status(200).json({
        sucess: true,
        data: null,
        message: "room is delete sucessfuly"
    })

})

module.exports = router;  