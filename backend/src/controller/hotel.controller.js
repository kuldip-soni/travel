const pool  = require("../db/mysql");


const gethotel = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM hotel');
        
        res.status(200).json({
             sucess: true,
             data: rows,
             message: "hotel is add sucessfuly"
        })

        
        
        
    } catch (error) {
        res.status(500).json({
            sucess: true,
            data: null,
            message: "internal server error (gethotel)" +error   

        })
        
    }
        

}

const addhotel = async(req,res) => {
    try {
        console.log("req.body");
       const {checkin,checkout,datetime,passenger,amount}=req.body;
       console.log(checkin,checkout,datetime,passenger,amount);
       
        const [rows,fields,result] = await pool.query("INSERT INTO hotel (checkin,checkout,datetime,passenger,amount) VALUES(?,?,?,?,?)", 
        [checkin,checkout,datetime,passenger,amount]

    )
       
      res.status(200).json({
             sucess: true,
             data: {...req.body, id: rows.insertId},
             message: "hotel is add sucessfuly"
        }) 

        

        console.log(rows,fields,result);
 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
             sucess: false,
             data: null,
             message: "internal server error (gethotel)" +error
        }) 
        
    }
    
}

const puthotel = () => {
    try {
       console.log("puthotel");
        
    } catch (error) {
        
    }
    
}

const delhotel = () => {
    try {
        console.log("delhotel");
        
    } catch (error) {
        
    }
    
}

module.exports = {
    gethotel,
    addhotel,
    puthotel,
    delhotel


}