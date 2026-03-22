const { error } = require("console");
const pool  = require("../db/mysql");
const fs = require('fs');




const getitineary = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM itineary');
        
        res.status(200).json({
             sucess: true,
             data: rows,
             message: "itineary is add sucessfuly"
        })

        
        
        
    } catch (error) {
        res.status(500).json({
            sucess: true,
            data: null,
            message: "internal server error (getitineary)" +error   

        })
        
    }
        

}

const additineary = async(req,res) => {
    try {
         console.log("req.body");
        console.log("dddddd",req.body, req.file.path);

        const { package_id, title, description, itineary_img } = req.body;
        console.log(title, description, itineary_img);

        const [rows, fields, result] = await pool.query("INSERT INTO itineary (package_id,title,description,itineary_img) VALUES(?,?,?,?)",
            [package_id, title, description, req.file.path]

        )

        res.status(200).json({
            sucess: true,
            data: { ...req.body, id: rows.insertId,itineary_img: req.file.path },
            message: "itineary is add sucessfuly"
        })



        console.log(rows, fields, result);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
             sucess: false,
             data: null,
             message: "internal server error (getitineary)" +error
        }) 
        
    }
    
}

const putitineary = async(req,res) => {
    try {
        console.log("req.body");
        const { package_id, title, description, itineary_img } = req.body;
        const itinearyId = req.params.id;
        console.log(package_id, title, description, itineary_img, itinearyId);

        const [rows] = await pool.query(`SELECT * FROM itineary WHERE id=${itinearyId}`);
        let fileimg = '';

        if (req.file) {

            fs.unlinkSync(rows[0].itineary_img, (error) => {
                console.log(error);

            })
            fileimg = req.file.path;
        } else {
            fileimg = rows[0].itineary_img
        }

        await pool.query("UPDATE  itineary  SET  package_id=?,title=?,description=?,itineary_img=? WHERE id=?",
            [package_id, title, description, fileimg, itinearyId]
        )

        res.status(200).json({
            sucess: true,
            data: { id: itinearyId, package_id, title, description, itineary_img: fileimg },
            message: "itineary is update sucessfuly"

        })
       
        
    } catch (error) {
          console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (putitineary)" + error
        })
        
    }
    
}

const delitineary = async(req,res) => {
    try {
       console.log("delitineary");
         // const { city, state, country, itineary_img } = req.body;
        const itinearyId = req.params.id;
        // console.log(itinearyId);

        const [rows] = await pool.query(`SELECT * FROM itineary WHERE id=${itinearyId}`);

        fs.unlinkSync(rows[0].itineary_img, (error) => {
            console.log(error);

        })

        await pool.query("DELETE FROM itineary WHERE id=?",
            [itinearyId]

        )

        res.status(200).json({
            sucess: true,
            data: null,
            message: "itineary is deleated sucessfuly"

        })
        
        
    } catch (error) {
         console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (delitineary)" + error
        })
    }
    
}

module.exports = {
    getitineary,
    additineary,
    putitineary,
    delitineary


}