const { error } = require("console");
const pool  = require("../db/mysql");
const fs = require('fs');


const gethotel = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM hotel');
        
        res.status(200).json({
             sucess: true,
             data: rows,
             message: "hotel is add sucessfuly"
        })

        
        
        
    } catch (error) {
        res.status(500).json({
            sucess: true,
            data: null,
            message: "internal server error (gethotel)" +error   

        })
        
    }
        

}

const addhotel = async(req,res) => {
    try {
               // console.log("req.body");
        //console.log("dddddd",req.body, req.file.path);
        const { location_id,vendor_id, service_id, checkin, checkout, datetime,passenger,amount,status} = req.body;
        console.log( location_id,vendor_id, service_id,checkin, checkout, datetime,passenger,amount,status);

        const [rows, fields, result] = await pool.query("INSERT INTO hotel (location_id,vendor_id,service_id,checkin,checkout,datetime,passenger,amount,hotel_img,status) VALUES(?,?,?,?,?,?,?,?,?,?)",
            [location_id,vendor_id, service_id, checkin, checkout, datetime,passenger,amount, req.file.path,status]

        )

        res.status(200).json({
            sucess: true,
            data: { ...req.body, id: rows.insertId, hotel_img: req.file.path,status },
            message: "hotel is add sucessfuly"
        })

        

        console.log(rows,fields,result);
 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
             sucess: false,
             data: null,
             message: "internal server error (gethotel)" +error
        }) 
        
    }
    
}

const puthotel =async (req,res) => {
    try {
       console.log("req.body");
        // console.log(req.body, req.file.path);

        const { booking_id,location_id, vendor_id, service_id, checkin, checkout, datetime,passenger,amount,status} = req.body;
        const hotelId = req.params.id;
        console.log(booking_id,location_id, checkin, checkout, datetime,passenger,amount, hotelId,status);

        const [rows] = await pool.query(`SELECT * FROM hotel WHERE id=${hotelId}`);
        let fileimg = '';

        if (req.file) {

            // fs.unlinkSync(rows[0].hotel_img, (error) => {
            //     console.log(error);

            // })
            fileimg = req.file.path;
        } else {
            fileimg = rows[0].hotel_img
        }


        await pool.query("UPDATE  hotel  SET booking_id=?,location_id=?, vendor_id=?, service_id=?, checkin=?, checkout=?, datetime=?,passenger=?,amount=?, hotel_img=?, status=? WHERE id=?",
            [booking_id,location_id, vendor_id, service_id, checkin, checkout, datetime,passenger,amount,fileimg,status, hotelId]

        )

        res.status(200).json({
            sucess: true,
            data: {  booking_id,location_id, vendor_id, service_id, checkin, checkout, datetime,passenger,amount, hotel_img: fileimg,status, id: hotelId },
            message: "hotel is update sucessfuly"

        })
        console.log(fields, result);

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (puthotel)" + error
        })
        
    }
    
}

const delhotel = async(req,res) => {
    try {
// const { city, state, country, hotel_img } = req.body;
        const hotelId = req.params.id;
        // console.log(hotelId);

        const [rows] = await pool.query(`SELECT * FROM hotel WHERE id=${hotelId}`);

        fs.unlinkSync(rows[0].hotel_img, (error) => {
            console.log(error);

        })

        await pool.query("DELETE FROM hotel WHERE id=?",
            [hotelId]

        )

        res.status(200).json({
            sucess: true,
            data: null,
            message: "hotel is deleated sucessfuly"

        })
        
    } catch (error) {
         console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (delhotel)" + error
        })
        
    }
    
}

module.exports = {
    gethotel,
    addhotel,
    puthotel,
    delhotel


}