const express = require("express");

const { getrestaurant, addrestaurant, putrestaurant, delrestaurant } = require("../controller/restaurant.controller");

const router = express.Router();

router.get('/getrestaurant', getrestaurant)

router.post('/addrestaurant', addrestaurant)

router.put('/putrestaurant/:id', putrestaurant)

router.delete('/delrestaurant/:id', delrestaurant)

module.exports = router;  