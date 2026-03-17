const pool  = require("../db/mysql");


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
       const {description,amount}=req.body;
       console.log(description,amount);
       
        const [rows,fields,result] = await pool.query("INSERT INTO service (description,amount) VALUES(?,?)", 
        [description,amount]

    )
       
      res.status(200).json({
             sucess: true,
             data: {...req.body, id: rows.insertId},
             message: "service is add sucessfuly"
        }) 

        

        console.log(rows,fields,result);
 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
             sucess: false,
             data: null,
             message: "internal server error (getservice)" +error
        }) 
        
    }
    
}

const putservice = () => {
    try {
       console.log("putservice");
        
    } catch (error) {
        
    }
    
}

const delservice = () => {
    try {
        console.log("delservice");
        
    } catch (error) {
        
    }
    
}

module.exports = {
    getservice,
    addservice,
    putservice,
    delservice


}