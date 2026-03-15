const express = require("express");
const router = express.Router();
const locationRoutes=require("./location.routes");
const packageRoutes=require("./package.routes");
const itinearyRoutes=require("./itineary.routes");
const transportRoutes=require("./transport.routes");
const hotelRoutes=require("./hotel.routes");
const restaurantRoutes=require("./restaurant.routes");
const vendorRoutes=require("./vendor.routes");
const serviceRoutes=require("./service.routes");
const roomRoutes=require("./room.routes");
const blogRoutes=require("./blog.routes");

router.use("/location",locationRoutes);
router.use("/package",packageRoutes);
router.use("/itineary",itinearyRoutes);
router.use("/transport",transportRoutes);
router.use("/hotel",hotelRoutes);
router.use("/restaurant",restaurantRoutes);
router.use("/vendor",vendorRoutes);
router.use("/service",serviceRoutes);
router.use("/room",roomRoutes);
router.use("/blog",blogRoutes);

module.exports = router; 