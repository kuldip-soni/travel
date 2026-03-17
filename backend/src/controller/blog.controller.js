const pool  = require("../db/mysql");


const getblog = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM blog');        
        res.status(200).json({
             sucess: true,
             data: rows,
             message: "blog is add sucessfuly"
        })

        
        
        
    } catch (error) {
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (getblog)" +error   

        })
        
    }
        

}

const addblog = async(req,res) => {
    try {
        console.log("req.body");
       const {title,date,description,image}=req.body;
       console.log(title,date,description,image);
       
        const [rows,fields,result] = await pool.query("INSERT INTO blog (title,date,description,image) VALUES(?,?,?,?)", 
        [title,date,description,image]

    )
       
      res.status(200).json({
             sucess: true,
             data: {...req.body, id: rows.insertId},
             message: "blog is add sucessfuly"
        }) 

        

        console.log(rows,fields,result);
 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
             sucess: false,
             data: null,
             message: "internal server error (getblog)" +error
        }) 
        
    }
    
}

const putblog = () => {
    try {
       console.log("putblog");
        
    } catch (error) {
        
    }
    
}

const delblog = () => {
    try {
        console.log("delblog");
        
    } catch (error) {
        
    }
    
}

module.exports = {
    getblog,
    addblog,
    putblog,
    delblog


}