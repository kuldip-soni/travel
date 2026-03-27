const pool = require("../db/mysql");


const bookpackage = async (req, res) => {
    try {
        const { location_id, package_id, travel_date, passenger } = req.body;

        console.log(location_id, package_id, travel_date, passenger);


        const [rows, fields, result] = await pool.query("INSERT INTO booking (location_id, package_id, travel_date, passenger) VALUES(?,?,?,?)",
            [location_id, package_id, travel_date, passenger]

        )

        res.status(200).json({
            sucess: true,
            data: { ...req.body, id: rows.insertId },
            message: "package  book sucessfuly"
        })



        console.log(rows, fields, result);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (bookpackage)" + error.message
        })

    }
}

module.exports = {
    bookpackage
    //login
}