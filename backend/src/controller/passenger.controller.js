const { error } = require("console");
const pool = require("../db/mysql");
const fs = require('fs');





const getpassenger = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM passenger');
        res.status(200).json({
            sucess: true,
            data: rows,
            message: "passenger is add sucessfuly"
        })




    } catch (error) {
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (getpassenger)" + error

        })

    }


}

const addpassenger = async (req, res) => {
    try {
        console.log("req.body");
        console.log("pppddd",req.body);

        const { bookin_id, name, age } = req.body;
        console.log(bookin_id, name, age);

        const [rows, fields, result] = await pool.query("INSERT INTO passenger (bookin_id,name,age) VALUES(?,?,?)",
            [bookin_id, name, age]

        )

        res.status(200).json({
            sucess: true,
            data: { ...req.body, id: rows.insertId },
            message: "passenger is add sucessfuly"
        })



        console.log(rows, fields, result);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (addpassenger)" + error.message
        })

    }

}

const putpassenger = async(req, res) => {
    try {
        console.log("req.body");
        const { bookin_id, name, age } = req.body;
        const passengerId = req.params.id;
        console.log(bookin_id, name, age, passengerId);

        const [rows] = await pool.query(`SELECT * FROM passenger WHERE id=${passengerId}`);
       

        await pool.query("UPDATE  passenger  SET  bookin_id=?,name=?,age=? WHERE id=?",
            [bookin_id, name, age, passengerId]
        )

        res.status(200).json({
            sucess: true,
            data: { id: passengerId, bookin_id, name, age },
            message: "passenger is update sucessfuly"

        })

    } catch (error) {
         console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (putpassenger)" + error
        })

    }

}

const delpassenger = async(req, res) => {
    try {
        console.log("delblog");
         // const { city, state, country, blog_img } = req.body;
        const passengerId = req.params.id;
        // console.log(passengerId);

        const [rows] = await pool.query(`SELECT * FROM passenger WHERE id=${passengerId}`);

        

        await pool.query("DELETE FROM passenger WHERE id=?",
            [passengerId]

        )

        res.status(200).json({
            sucess: true,
            data: null,
            message: "passenger is deleated sucessfuly"

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (delpassenger)" + error
        })

    }

}

module.exports = {
    getpassenger,
    addpassenger,
    putpassenger,
    delpassenger


}