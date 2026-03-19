const pool = require("../db/mysql");


const getlocation = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM location');

        res.status(200).json({
            sucess: true,
            data: rows,
            message: "location is add sucessfuly"
        })




    } catch (error) {
        res.status(500).json({
            sucess: true,
            data: null,
            message: "internal server error (getlocation)" + error

        })

    }


}

const addlocation = async (req, res) => {
    try {
        console.log("req.body");
        const { city, state, country, image } = req.body;
        console.log(city, state, country, image);

        const [rows, fields, result] = await pool.query("INSERT INTO location (city,state,country,image) VALUES(?,?,?,?)",
            [city, state, country, image]

        )

        res.status(200).json({
            sucess: true,
            data: { ...req.body, id: rows.insertId },
            message: "location is add sucessfuly"
        })



        console.log(rows, fields, result);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (getlocation)" + error
        })

    }

}

const putlocation = async (req, res) => {
    try {

        console.log("req.body");
        const { city, state, country, image } = req.body;
        const locationId =req.params.id;
        console.log(city, state, country, image,locationId);
        
        const [rows, fields, result] = await pool.query("UPDATE  location  SET  city=?,state=?,country=?,image=? WHERE id=?",
            [city, state, country, image,locationId]

        )

        res.status(200).json({
            sucess: true,
            data:{ city, state, country, image, id:locationId} ,
            message: "location is update sucessfuly"

        })

    } catch (error) {
         console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (putlocation)" + error
        })


    }

}

const dellocation = async(req, res) => {
    try {

        // const { city, state, country, image } = req.body;
        const locationId =req.params.id;
        console.log(locationId);
        
        const [rows, fields, result] = await pool.query("DELETE FROM location WHERE id=?",
            [locationId]

        )

        res.status(200).json({
            sucess: true,
            data: null,
            message: "location is deleated sucessfuly"

        })
        
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (dellocation)" + error
        })

    }

}

module.exports = {
    getlocation,
    addlocation,
    putlocation,
    dellocation


}