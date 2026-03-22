const { error } = require("console");
const pool = require("../db/mysql");
const fs = require('fs');


const getrestaurant = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM restaurant');

        res.status(200).json({
            sucess: true,
            data: rows,
            message: "restaurant is add sucessfuly"
        })




    } catch (error) {
        res.status(500).json({
            sucess: true,
            data: null,
            message: "internal server error (getrestaurant)" + error

        })

    }
    // datetime,meals,passenger,amount

}

const addrestaurant = async (req, res) => {
    try {
        // console.log("req.body");
        //console.log("dddddd",req.body, req.file.path);
        const { vendor_id, service_id, datetime, meals, passenger, amount
            , restaurant_img } = req.body;
        console.log(datetime,meals,passenger,amount
);

        const [rows, fields, result] = await pool.query("INSERT INTO restaurant (vendor_id,service_id,datetime,meals,passenger,amount,restaurant_img) VALUES(?,?,?,?,?,?)",
            [vendor_id, service_id, datetime, meals, passenger, amount, req.file.path]

        )

        res.status(200).json({
            sucess: true,
            data: { ...req.body, id: rows.insertId, restaurant_img: req.file.path },
            message: "restaurant is add sucessfuly"
        })



        console.log(rows, fields, result);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (getrestaurant)" + error
        })

    }

}

const putrestaurant = async() => {
    try {
       console.log("req.body");
        // console.log(req.body, req.file.path);

        const { vendor_id, service_id, datetime,meals,passenger,amount} = req.body;
        const restaurantId = req.params.id;
        console.log(datetime,meals,passenger,amount, restaurantId);

        const [rows] = await pool.query(`SELECT * FROM restaurant WHERE id=${restaurantId}`);
        let fileimg = '';

        if (req.file) {

            fs.unlinkSync(rows[0].image, (error) => {
                console.log(error);

            })
            fileimg = req.file.path;
        } else {
            fileimg = rows[0].image
        }


        await pool.query("UPDATE  restaurant  SET location_id=?, service_id=?, datetime=?, meals=?, passenger=?, amount=? restaurant_img=? WHERE id=?",
            [vendor_id, service_id, datetime,meals,passenger,amount,fileimg, restaurantId]

        )

        res.status(200).json({
            sucess: true,
            data: {  vendor_id, service_id, from, to, datetime,passenger,amount, image: fileimg, id: restaurantId },
            message: "restaurant is update sucessfuly"

        })
        console.log(fields, result);

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (putrestaurant)" + error
        })
        
    }

}

const delrestaurant =async () => {
    try {
               // const { city, state, country, image } = req.body;
        const restaurantId = req.params.id;
        // console.log(restaurantId);

        const [rows] = await pool.query(`SELECT * FROM restaurant WHERE id=${restaurantId}`);

        fs.unlinkSync(rows[0].image, (error) => {
            console.log(error);

        })

        await pool.query("DELETE FROM restaurant WHERE id=?",
            [restaurantId]

        )

        res.status(200).json({
            sucess: true,
            data: null,
            message: "restaurant is deleated sucessfuly"

        })
        
    } catch (error) {
         console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (delrestaurant)" + error
        })
        
    }
}

module.exports = {
    getrestaurant,
    addrestaurant,
    putrestaurant,
    delrestaurant


}