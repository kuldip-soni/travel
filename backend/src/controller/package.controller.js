const pool  = require("../db/mysql");


const getpackage = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM package');
        
        res.status(200).json({
             sucess: true,
             data: rows,
             message: "package is add sucessfuly"
        })

        
        
        
    } catch (error) {
        res.status(500).json({
            sucess: true,
            data: null,
            message: "internal server error (getpackage)" +error   

        })
        
    }
        

}

const addpackage = async(req,res) => {
    try {
        console.log("req.body");
       const {name,duration,price,image}=req.body;
       console.log(name,duration,price,image);
       
        const [rows,fields,result] = await pool.query("INSERT INTO package (name,duration,price,image) VALUES(?,?,?,?)", 
        [name,duration,price,image]

    )
       
      res.status(200).json({
             sucess: true,
             data: {...req.body, id: rows.insertId},
             message: "package is add sucessfuly"
        }) 

        

        console.log(rows,fields,result);
 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
             sucess: false,
             data: null,
             message: "internal server error (getpackage)" +error
        }) 
        
    }
    
}

const putpackage =async (req,res) => {
    try {
         console.log("req.body");
        const { name,duration,price,image } = req.body;
        const packageId =req.params.id;
        console.log(name,duration,price,image,packageId);
        
        const [rows, fields, result] = await pool.query("UPDATE  package  SET  name=?, duration=?, price=?, image=? WHERE id=?",
            [name,duration,price,image,packageId]

        )

        res.status(200).json({
            sucess: true,
            data: {name,duration,price,image,id:packageId},
            message: "package is update sucessfuly"

        })
        console.log(fields, result);

        
        
    } catch (error) {
         console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (putpackage)" + error
        })
        
    }
    
}

const delpackage = async(req,res) => {
    try {
        const  packageId =req.params.id;
        console.log( packageId);
        
        const [rows, fields, result] = await pool.query("DELETE FROM package WHERE id=?",
            [ packageId]

        )

        res.status(200).json({
            sucess: true,
            data: null,
            message: "package is deleated sucessfuly"

        })
        
        
    } catch (error) {
         console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (delpackage)" + error
        })
        
    }
    
}

module.exports = {
    getpackage,
    addpackage,
    putpackage,
    delpackage


}