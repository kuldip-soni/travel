const express = require("express");
const router = express.Router();
const locationRoutes=require("./location.routes");

router.use("/location",locationRoutes);


module.exports = router; 