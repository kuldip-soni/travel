const pool  = require("../db/mysql");


const gettransport = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM transport');
        
        res.status(200).json({
             sucess: true,
             data: rows,
             message: "transport is add sucessfuly"
        })

        
        
        
    } catch (error) {
        res.status(500).json({
            sucess: true,
            data: null,
            message: "internal server error (gettransport)" +error   

        })
        
    }
        

}

const addtransport = async(req,res) => {
    try {
        console.log("req.body");
       const {from,to,datetime,passenger,amount}=req.body;
       console.log(from,to,datetime,passenger,amount);
       
        const [rows,fields,result] = await pool.query("INSERT INTO transport (`from`,`to`,datetime,passenger,amount) VALUES (?,?,?,?,?)", 
        [from,to,datetime,passenger,amount]

    )
       
      res.status(200).json({
             sucess: true,
             data: {...req.body, id: rows.insertId},
             message: "transport is add sucessfuly"
        }) 

        

        console.log(rows,fields,result);
 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
             sucess: false,
             data: null,
             message: "internal server error (gettransport)" +error
        }) 
        
    }
    
}

const puttransport = () => {
    try {
       console.log("puttransport");
        
    } catch (error) {
        
    }
    
}

const deltransport = () => {
    try {
        console.log("deltransport");
        
    } catch (error) {
        
    }
    
}

module.exports = {
    gettransport,
    addtransport,
    puttransport,
    deltransport


}