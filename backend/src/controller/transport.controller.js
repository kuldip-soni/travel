const { error } = require("console");
const pool = require("../db/mysql");
const fs = require('fs');



const gettransport = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM transport');

        res.status(200).json({
            sucess: true,
            data: rows,
            message: "transport is add sucessfuly"
        })




    } catch (error) {
        res.status(500).json({
            sucess: true,
            data: null,
            message: "internal server error (gettransport)" + error

        })

    }


}

const addtransport = async (req, res) => {
    try {
        // console.log("req.body");
        console.log("dddddd", req.body, req.file);
        const { booking_id, vendor_id, service_id, from, to, datetime, passenger, amount } = req.body;
        console.log(vendor_id, service_id, from, to, datetime, passenger, amount);

        // const [rows, fields, result] = await pool.query("INSERT INTO transport (vendor_id,service_id,from,to,datetime,passenger,amount,transport_img) VALUES(?,?,?,?,?,?,?,?)",
        //     [vendor_id, service_id, from, to, datetime,passenger,amount, req.file.path]

        // )


        const [rows, fields, result] = await pool.query("INSERT INTO `transport`(`booking_id`,`vendor_id`, `service_id`, `from`, `to`, `datetime`, `passenger`, `amount`, `transport_img`) VALUES (?,?,?,?,?,?,?,?,?)", [booking_id, vendor_id, service_id, from, to, datetime, passenger, amount, req.file.path]
        )

        console.log(rows);


        res.status(200).json({
            sucess: true,
            data: { ...req.body, id: rows.insertId, transport_img: req.file.path },
            message: "transport is add sucessfuly"
        })



        console.log(rows, fields, result);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (gettransport)" + error.message
        })

    }

}

const puttransport = async (req, res) => {
    try {
        console.log("req.body");
        // console.log(req.body, req.file.path);

        const { vendor_id, booking_id, service_id, from, to, datetime, passenger, amount, transport_img } = req.body;
        const transportId = req.params.id;
        console.log(from, to, datetime, passenger, amount, transport_img, transportId);

        const [rows] = await pool.query(`SELECT * FROM transport WHERE id=${transportId}`);
        let fileimg = '';

        if (req.file) {

            // fs.unlinkSync(rows[0].transport_img, (error) => {
            //     console.log(error);

            // })
            fileimg = req.file.path;
        } else {
            fileimg = rows[0].image
        }


        const [fields, result] = await pool.query(
            `UPDATE transport 
   SET booking_id = ?,
        vendor_id = ?, 
       service_id = ?, 
       \`from\` = ?, 
       \`to\` = ?, 
       \`datetime\` = ?, 
       passenger = ?, 
       amount = ?, 
       transport_img = ? 
   WHERE id = ?`,
            [booking_id, vendor_id, service_id, from, to, datetime, passenger, amount, fileimg, transportId]
        );

        res.status(200).json({
            sucess: true,
            data: { vendor_id, service_id, from, to, datetime, passenger, amount, transport_img: fileimg, id: transportId },
            message: "transport is update sucessfuly"

        })
        console.log(fields, result);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (puttransport)" + error
        })

    }

}

const deltransport = async (req, res) => {
    try {
        // const { city, state, country, image } = req.body;
        const transportId = req.params.id;
        // console.log(transportId);

        const [rows] = await pool.query(`SELECT * FROM transport WHERE id=${transportId}`);

        fs.unlinkSync(rows[0].transport_img, (error) => {
            console.log(error);

        })

        await pool.query("DELETE FROM transport WHERE id=?",
            [transportId]

        )

        res.status(200).json({
            sucess: true,
            data: null,
            message: "transport is deleated sucessfuly"

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (deltransport)" + error
        })

    }

}

module.exports = {
    gettransport,
    addtransport,
    puttransport,
    deltransport


}