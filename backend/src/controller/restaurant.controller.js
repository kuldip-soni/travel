const pool  = require("../db/mysql");


const getrestaurant = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM restaurant');
        
        res.status(200).json({
             sucess: true,
             data: rows,
             message: "restaurant is add sucessfuly"
        })

        
        
        
    } catch (error) {
        res.status(500).json({
            sucess: true,
            data: null,
            message: "internal server error (getrestaurant)" +error   

        })
        
    }
        

}

const addrestaurant = async(req,res) => {
    try {
        console.log("req.body");
       const {datetime,meals,passenger,amount}=req.body;
       console.log(datetime,meals,passenger,amount);
       
        const [rows,fields,result] = await pool.query("INSERT INTO restaurant (datetime,meals,passenger,amount) VALUES(?,?,?,?)", 
        [datetime,meals,passenger,amount]

    )
       
      res.status(200).json({
             sucess: true,
             data: {...req.body, id: rows.insertId},
             message: "restaurant is add sucessfuly"
        }) 

        

        console.log(rows,fields,result);
 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
             sucess: false,
             data: null,
             message: "internal server error (getrestaurant)" +error
        }) 
        
    }
    
}

const putrestaurant = () => {
    try {
       console.log("putrestaurant");
        
    } catch (error) {
        
    }
    
}

const delrestaurant = () => {
    try {
        console.log("delrestaurant");
        
    } catch (error) {
        
    }
    
}

module.exports = {
    getrestaurant,
    addrestaurant,
    putrestaurant,
    delrestaurant


}