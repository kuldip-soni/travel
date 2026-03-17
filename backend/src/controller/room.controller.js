const pool  = require("../db/mysql");


const getroom = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM room');        
        res.status(200).json({
             sucess: true,
             data: rows,
             message: "room is add sucessfuly"
        })

        
        
        
    } catch (error) {
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (getroom)" +error   

        })
        
    }
        

}

const addroom = async(req,res) => {
    try {
        console.log("req.body");
       const {name,description,price}=req.body;
       console.log(name,description,price);
       
        const [rows,fields,result] = await pool.query("INSERT INTO room (name,description,price) VALUES(?,?,?)", 
        [name,description,price]

    )
       
      res.status(200).json({
             sucess: true,
             data: {...req.body, id: rows.insertId},
             message: "room is add sucessfuly"
        }) 

        

        console.log(rows,fields,result);
 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
             sucess: false,
             data: null,
             message: "internal server error (getroom)" +error
        }) 
        
    }
    
}

const putroom = () => {
    try {
       console.log("putroom");
        
    } catch (error) {
        
    }
    
}

const delroom = () => {
    try {
        console.log("delroom");
        
    } catch (error) {
        
    }
    
}

module.exports = {
    getroom,
    addroom,
    putroom,
    delroom


}