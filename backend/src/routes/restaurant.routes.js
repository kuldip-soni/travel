const express = require("express");
const upload = require("../middleware/upload");

const { getrestaurant, addrestaurant, putrestaurant, delrestaurant } = require("../controller/restaurant.controller");

const router = express.Router();

router.get('/getrestaurant', getrestaurant)

router.post('/addrestaurant',upload.single('restaurant_img'), addrestaurant)

router.put('/putrestaurant/:id',upload.single('restaurant_img'), putrestaurant)

router.delete('/delrestaurant/:id', delrestaurant)

module.exports = router;  