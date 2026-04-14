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
const bookingRoutes=require("./booking.routes");
const contactRoutes=require("./contect.routes");

const userRoutes = require("./user.routes");
const paymentRoutes = require("./payment.routes");
const passengerRoutes = require("./passenger.routes");
const dashboardRoutes = require("./dashboard.routes");



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
router.use("/contect",contactRoutes);
router.use("/user",userRoutes);
router.use("/booking",bookingRoutes);
router.use("/payment", paymentRoutes);
router.use("/passenger", passengerRoutes);
router.use("/dashboard", dashboardRoutes);



module.exports = router; 