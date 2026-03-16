const pool  = require("../db/mysql");


const getlocation = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM location');
        
        res.status(200).json({
             sucess: true,
             data: rows,
             message: "location is add sucessfuly"
        })

        
        
        
    } catch (error) {
        res.status(500).json({
            sucess: true,
            data: null,
            message: "internal server error (getlocation)" +error   

        })
        
    }
        

}

const addlocation = async(req,res) => {
    try {
        console.log("req.body");
       const {city,state,country,image}=req.body;
       console.log(city,state,country,image);
       
        const [rows,fields,result] = await pool.query("INSERT INTO location (city,state,country,image) VALUES(?,?,?,?)", 
        [city,state,country,image]

    )
       
      res.status(200).json({
             sucess: true,
             data: {...req.body, id: rows.insertId},
             message: "location is add sucessfuly"
        }) 

        

        console.log(rows,fields,result);
 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
             sucess: false,
             data: null,
             message: "internal server error (getlocation)" +error
        }) 
        
    }
    
}

const putlocation = () => {
    try {
       console.log("putlocation");
        
    } catch (error) {
        
    }
    
}

const dellocation = () => {
    try {
        console.log("dellocation");
        
    } catch (error) {
        
    }
    
}

module.exports = {
    getlocation,
    addlocation,
    putlocation,
    dellocation


}