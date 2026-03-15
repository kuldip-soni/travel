const express = require("express");
const router = express.Router();

router.get('/getitineary', (req, res) => {
    res.send('Hello Node!')
})

router.post('/additineary', (req, res) => {
    console.log(req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "itineary is add sucessfuly"

    })

})

router.put('/putitineary/:id', (req, res) => {
    console.log(req.params.id, req.body);

    res.status(200).json({
        sucess: true,
        data: req.body,
        message: "itineary is update sucessfuly"

    })

})

router.delete('/delitineary/:id', (req, res) => {
    console.log(req.params.id);

    res.status(200).json({
        sucess: true,
        data: null,
        message: "itineary is delete sucessfuly"
    })

})

module.exports = router;  
