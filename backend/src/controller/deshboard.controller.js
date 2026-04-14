const { error } = require("console");
const pool = require("../db/mysql");
const fs = require('fs');





const getdashboard = async (req, res) => {
    try {
        const [loc] = await pool.query("SELECT COUNT(id) AS count FROM location");
        const [pack] = await pool.query("SELECT COUNT(id) AS count FROM package");
        const [book] = await pool.query("SELECT COUNT(id) AS count FROM booking");
        const [rev] = await pool.query("SELECT SUM(amount) AS total FROM payment WHERE status='complete'");

        const [pre] = await pool.query("SELECT COUNT(id) AS count FROM booking WHERE type='predefined_package'");
        const [cust] = await pool.query("SELECT COUNT(id) AS count FROM booking WHERE type='customized_package'");

        const [hot] = await pool.query("SELECT COUNT(id) AS count FROM hotel WHERE booking_id=0");
        const [trans] = await pool.query("SELECT COUNT(id) AS count FROM transport WHERE booking_id=0");
        const [rest] = await pool.query("SELECT COUNT(id) AS count FROM restaurant WHERE booking_id=0");

        const response = {
            locations: loc[0].count || 0,
            packages: pack[0].count || 0,
            bookings: book[0].count || 0,
            revenue: rev[0].total || 0,
            predefined: pre[0].count || 0,
            customized: cust[0].count || 0,
            hotels: hot[0].count || 0,
            transport: trans[0].count || 0,
            restaurants: rest[0].count || 0
        };

        res.status(200).json({
            success: true,
            data: response,
            message: "Dashboard data fetched successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error (dashboard) " + error
        });
    }
}

const getrecentBooking = async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT 
            booking.id,
            booking.travel_date,
            booking.passenger,
            booking.status,
            package.name,
            package.duration,
            package.price
        FROM booking
        INNER JOIN package
        ON booking.package_id = package.id
        ORDER BY booking.id DESC
    `);

        const response = rows.map(item => ({
            id: item.id,
            travel_date: item.travel_date,
            passenger: item.passenger,
            status: item.status,
            name: item.name,
            duration: item.duration,
            price: item.price
        }));

        res.status(200).json({
            success: true,
            data: response,
            message: "Booking list fetched successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error (booking list) " + error.message
        });
    }
}

const locationWisePayment = async (req, res) => {
    try {
        const [locwisePayment] = await pool.query(`
            SELECT 
                l.name AS location_name,
                SUM(p.amount) AS total_revenue
            FROM booking b
            LEFT JOIN payment p ON b.id = p.booking_id
            LEFT JOIN location l ON b.location_id = l.id
            WHERE p.status = 'complete'
            GROUP BY b.location_id;  
        `);

        console.log("locwisePayment", locwisePayment);
        

        return res.status(200).json({
            success: true,
            data: locwisePayment,
            message: "Location wise payment fetched"
        })
    } catch (error) {
                res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error (booking list) " + error.message
        });
    }
}

const monthWiseRevenue = async (req, res) => {
    try {
        const [monWisePayment] = await pool.query(`
            SELECT 
                MONTH(date) AS month_number,
                DATE_FORMAT(date, '%b') AS month,
                SUM(amount) AS revenue
            FROM payment
            WHERE status = 'complete'
            GROUP BY MONTH(date), DATE_FORMAT(date, '%b')
            ORDER BY MONTH(date);
        `);

        console.log("monWisePayment", monWisePayment);
        

        return res.status(200).json({
            success: true,
            data: monWisePayment,
            message: "Month wise payment fetched"
        })
    } catch (error) {
                res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error (booking list) " + error.message
        });
    }
}

module.exports = {
    getdashboard,
    getrecentBooking,
locationWisePayment,
monthWiseRevenue

}



