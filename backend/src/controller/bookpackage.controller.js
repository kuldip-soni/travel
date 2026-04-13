const pool = require("../db/mysql");


const bookpackage = async (req, res) => {
      try {
        const { user_id, location_id, package_id, travel_date, passengers } = req.body;

        console.log("REQ BODY:", req.body);

        // 1. Insert booking
        const [result] = await pool.query(
            "INSERT INTO booking (user_id, location_id, package_id, travel_date, passenger) VALUES (?,?,?,?,?)",
            [
                user_id,
                location_id,
                package_id,
                travel_date,
                passengers.length
            ]
        );

        const booking_id = result.insertId;

        // 2. Insert passengers
        for (let p of passengers) {
            await pool.query(
                "INSERT INTO passenger (booking_id, name, age) VALUES (?,?,?)",
                [booking_id, p.name, p.age]
            );
        }

        res.status(200).json({
            sucess: true,
            data: { ...req.body, id: booking_id },
            message: "package booked successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (bookpackage) " + error.message
        });
    }


}



const getBooking = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM booking');
        res.status(200).json({
            sucess: true,
            data: rows,
            message: "booking data fetched"
        })




    } catch (error) {
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (getBooking)" + error.message

        })

    }


}

const getmyBooking = async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM booking WHERE user_id=${req.params.user_id}`);

        console.log(`SELECT * FROM booking WHERE user_id=${req.params.user_id}`);


        res.status(200).json({
            sucess: true,
            data: rows,
            message: "booking data fetched"
        })




    } catch (error) {
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (getBooking)" + error.message

        })

    }


}

module.exports = {
    bookpackage,
    getBooking,
    getmyBooking

}