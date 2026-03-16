const pool  = require("../db/mysql");


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
        console.log("req.body");
       const {name,phoneno,gstno,email,type,company_name,status}=req.body;
       console.log(name,phoneno,gstno,email,type,company_name,status);
       
        const [rows,fields,result] = await pool.query("INSERT INTO vendor (name,phoneno,gstno,email,type,company_name,status) VALUES(?,?,?,?,?,?,?)", 
        [name,phoneno,gstno,email,type,company_name,status]

    )
       
      res.status(200).json({
             sucess: true,
             data: {...req.body, id: rows.insertId},
             message: "vendor is add sucessfuly"
        }) 

        

        console.log(rows,fields,result);
 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
             sucess: false,
             data: null,
             message: "internal server error (getvendor)" +error
        }) 
        
    }
    
}

const putvendor = () => {
    try {
       console.log("putvendor");
        
    } catch (error) {
        
    }
    
}

const delvendor = () => {
    try {
        console.log("delvendor");
        
    } catch (error) {
        
    }
    
}

module.exports = {
    getvendor,
    addvendor,
    putvendor,
    delvendor


}