const { error } = require("console");
const pool  = require("../db/mysql");
const fs = require('fs');



const getvendor = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM vendor');
        
        res.status(200).json({
             sucess: true,
             data: rows,
             message: "vendor is add sucessfuly"
        })

        
        
        
    } catch (error) {
        res.status(500).json({
            sucess: true,
            data: null,
            message: "internal server error (getvendor)" +error   

        })
        
    }
        

}

const addvendor = async(req,res) => {
    try {
        console.log("req.body", req.body);
       const {location_id,name,phoneno,gstno,email,type,company_name,status,vendor_img}=req.body;
       console.log(name,phoneno,gstno,email,type,company_name,status,vendor_img);
       
        const [rows,fields,result] = await pool.query("INSERT INTO vendor (location_id,name,phoneno,gstno,email,type,company_name,status,vendor_img) VALUES(?,?,?,?,?,?,?,?,?)", 
        [location_id,name,phoneno,gstno,email,type,company_name,status, req.file.path]

    )
       
      res.status(200).json({
             sucess: true,
             data: {...req.body, id: rows.insertId,vendor_img:req.file.path},
             message: "vendor is add sucessfuly"
        }) 

        

        console.log(rows,fields,result);
 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
             sucess: false,
             data: null,
             message: "internal server error (getvendor)" +error.message
        }) 
        
    }
    
}

const putvendor = async(req,res) => {
    try {
 console.log("req.body");
        const { name,phoneno,gstno,email,type,company_name,status,vendor_img} = req.body;
        const vendorId = req.params.id;
        console.log(name,phoneno,gstno,email,type,company_name,status,vendor_img, vendorId);

        const [rows] = await pool.query(`SELECT * FROM vendor WHERE id=${vendorId}`);
        let fileimg = '';

        if (req.file) {

            fs.unlinkSync(rows[0].vendor_img, (error) => {
                console.log(error);

            })
            fileimg = req.file.path;
        } else {
            fileimg = rows[0].vendor_img
        }

        await pool.query("UPDATE  vendor  SET  name=?,phoneno=?,gstno=?,email=?,type=?,company_name=?,status=?,vendor_img=? WHERE id=?",
            [name,phoneno,gstno,email,type,company_name,status, fileimg, vendorId]
        )

        res.status(200).json({
            sucess: true,
            data: { id: vendorId, name,phoneno,gstno,email,type,company_name,status, vendor_img: fileimg },
            message: "vendor is update sucessfuly"

        })
        
    } catch (error) {
          console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (putvendor)" + error
        })
 
    }
    
}

const delvendor = async(req,res) => {
    try {
        console.log("delvendor");
         // const { city, state, country, vendor_img } = req.body;
        const vendorId = req.params.id;
        // console.log(vendorId);

        const [rows] = await pool.query(`SELECT * FROM vendor WHERE id=${vendorId}`);

        fs.unlinkSync(rows[0].vendor_img, (error) => {
            console.log(error);

        })

        await pool.query("DELETE FROM vendor WHERE id=?",
            [vendorId]

        )

        res.status(200).json({
            sucess: true,
            data: null,
            message: "vendor is deleated sucessfuly"

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (delvendor)" + error
        })

    }

    
}

module.exports = {
    getvendor,
    addvendor,
    putvendor,
    delvendor


}