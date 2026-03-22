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
        const { vendor_id, service_id, checkin, checkout, datetime,passenger,amount, hotel_img } = req.body;
        console.log( checkin, checkout, datetime,passenger,amount);

        const [rows, fields, result] = await pool.query("INSERT INTO hotel (vendor_id,service_id,checkin,checkout,datetime,passenger,amount,hotel_img) VALUES(?,?,?,?,?,?)",
            [vendor_id, service_id, checkin, checkout, datetime,passenger,amount, req.file.path]

        )

        res.status(200).json({
            sucess: true,
            data: { ...req.body, id: rows.insertId, hotel_img: req.file.path },
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

const puthotel =async () => {
    try {
       console.log("req.body");
        // console.log(req.body, req.file.path);

        const { vendor_id, service_id, checkin, checkout, datetime,passenger,amount} = req.body;
        const hotelId = req.params.id;
        console.log(checkin, checkout, datetime,passenger,amount, hotelId);

        const [rows] = await pool.query(`SELECT * FROM hotel WHERE id=${hotelId}`);
        let fileimg = '';

        if (req.file) {

            fs.unlinkSync(rows[0].image, (error) => {
                console.log(error);

            })
            fileimg = req.file.path;
        } else {
            fileimg = rows[0].image
        }


        await pool.query("UPDATE  hotel  SET location_id=?, name=?, duration=?, price=?, itineary_id=?, image=? WHERE id=?",
            [vendor_id, service_id, checkin, checkout, datetime,passenger,amount,fileimg, hotelId]

        )

        res.status(200).json({
            sucess: true,
            data: {  vendor_id, service_id, checkin, checkout, datetime,passenger,amount, image: fileimg, id: hotelId },
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

const delhotel = async() => {
    try {
// const { city, state, country, image } = req.body;
        const hotelId = req.params.id;
        // console.log(hotelId);

        const [rows] = await pool.query(`SELECT * FROM hotel WHERE id=${hotelId}`);

        fs.unlinkSync(rows[0].image, (error) => {
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