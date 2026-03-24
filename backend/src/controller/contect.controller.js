const { error } = require("console");
const pool = require("../db/mysql");
const fs = require('fs');



const getcontect = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contect');

        res.status(200).json({
            sucess: true,
            data: rows,
            message: "contect is add sucessfuly"
        })




    } catch (error) {
        res.status(500).json({
            sucess: true,
            data: null,
            message: "internal server error (getcontect)" + error

        })

    }


}

const addcontect = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const { name, email, subject, message } = req.body;
        console.log(name, email, subject, message);

        const [rows, fields, result] = await pool.query("INSERT INTO contect (name,email,subject,message) VALUES(?,?,?,?)",
            [name, email, subject, message]

        )

        res.status(200).json({
            sucess: true,
            data: { ...req.body, id: rows.insertId },
            message: "contect is add sucessfuly"
        })



        console.log(rows, fields, result);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (getcontect)" + error.message
        })

    }

}

const putcontect = async (req, res) => {
    try {
        console.log("req.body");
        const { name, email, subject, message } = req.body;
        const contectId = req.params.id;
        console.log(name, email, subject, message);

        const [rows] = await pool.query(`SELECT * FROM contect WHERE id=${contectId}`);
       

        await pool.query("UPDATE  contect  SET  name=?,email=?,subject=?,message=? WHERE id=?",
            [name, email, subject, message, contectId]
        )

        res.status(200).json({
            sucess: true,
            data: { id: contectId, name, email, subject, message },
            message: "contect is update sucessfuly"

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (putcontect)" + error
        })

    }

}

const delcontect = async (req, res) => {
    try {
        console.log("delcontect");
        // const { city, state, country, contect_img } = req.body;
        const contectId = req.params.id;
        // console.log(contectId);

        const [rows] = await pool.query(`SELECT * FROM contect WHERE id=${contectId}`);


        await pool.query("DELETE FROM contect WHERE id=?",
            [contectId]

        )

        res.status(200).json({
            sucess: true,
            data: null,
            message: "contect is deleated sucessfuly"

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (delcontect)" + error
        })

    }


}

module.exports = {
    getcontect,
    addcontect,
    putcontect,
    delcontect


}