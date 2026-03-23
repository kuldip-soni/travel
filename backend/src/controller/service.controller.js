const { error } = require("console");
const pool  = require("../db/mysql");
const fs = require('fs');




const getservice = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM service');        
        res.status(200).json({
             sucess: true,
             data: rows,
             message: "service is add sucessfuly"
        })

        
        
        
    } catch (error) {
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (getservice)" +error   

        })
        
    }
        

}

const addservice = async(req,res) => {
    try {
      console.log("req.body");
        console.log("dddddd",req.body, req.file.path);

        const { vendor_id,name, description, amount, service_img } = req.body;
        console.log( name,description, amount, service_img);

        const [rows, fields, result] = await pool.query("INSERT INTO service (vendor_id,name,description,amount,service_img) VALUES(?,?,?,?,?)",
            [vendor_id,name, description, amount, req.file.path]

        )

        res.status(200).json({
            sucess: true,
            data: { ...req.body, id: rows.insertId,service_img: req.file.path },
            message: "service is add sucessfuly"
        })



        console.log(rows, fields, result);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (getservice)" + error.message
        })
        
    }
    
}

const putservice =async (req,res) => {
   try {
        console.log("req.body");
        const { vendor_id,name, description, amount, service_img } = req.body;
        const serviceId = req.params.id;
        console.log(name,description, amount, service_img, serviceId);

        const [rows] = await pool.query(`SELECT * FROM service WHERE id=${serviceId}`);
        let fileimg = '';

        if (req.file) {

            fs.unlinkSync(rows[0].service_img, (error) => {
                console.log(error);

            })
            fileimg = req.file.path;
        } else {
            fileimg = rows[0].service_img
        }

        await pool.query("UPDATE  service  SET  vendor_id=?,name=?,description=?,amount=?,service_img=? WHERE id=?",
            [vendor_id,name, description, amount, fileimg, serviceId]
        )

        res.status(200).json({
            sucess: true,
            data: { id: serviceId, name,description, amount, service_img: fileimg },
            message: "service is update sucessfuly"

        })

    } catch (error) {
         console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (putservice)" + error
        })

    }
    
}

const delservice = async() => {
 try {
        console.log("delservice");
         // const { city, state, country, service_img } = req.body;
        const serviceId = req.params.id;
        // console.log(serviceId);

        const [rows] = await pool.query(`SELECT * FROM service WHERE id=${serviceId}`);

        fs.unlinkSync(rows[0].service_img, (error) => {
            console.log(error);

        })

        await pool.query("DELETE FROM service WHERE id=?",
            [serviceId]

        )

        res.status(200).json({
            sucess: true,
            data: null,
            message: "service is deleated sucessfuly"

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (delservice)" + error
        })

    }    
}

module.exports = {
    getservice,
    addservice,
    putservice,
    delservice


}