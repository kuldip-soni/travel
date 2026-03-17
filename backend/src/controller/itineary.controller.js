const pool  = require("../db/mysql");


const getitineary = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM itineary');
        
        res.status(200).json({
             sucess: true,
             data: rows,
             message: "itineary is add sucessfuly"
        })

        
        
        
    } catch (error) {
        res.status(500).json({
            sucess: true,
            data: null,
            message: "internal server error (getitineary)" +error   

        })
        
    }
        

}

const additineary = async(req,res) => {
    try {
        console.log("req.body");
       const {title,description}=req.body;
       console.log(title,description);
       
        const [rows,fields,result] = await pool.query("INSERT INTO itineary (title,description) VALUES(?,?)", 
        [title,description]

    )
       
      res.status(200).json({
             sucess: true,
             data: {...req.body, id: rows.insertId},
             message: "itineary is add sucessfuly"
        }) 

        

        console.log(rows,fields,result);
 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
             sucess: false,
             data: null,
             message: "internal server error (getitineary)" +error
        }) 
        
    }
    
}

const putitineary = async(req,res) => {
    try {
        console.log("req.body");
        const { title,description } = req.body;
        const itinearyId =req.params.id;
        console.log(title,description,itinearyId);
        
        const [rows, fields, result] = await pool.query("UPDATE  itineary  SET  title=?, description=? WHERE id=?",
            [title,description,itinearyId]

        )

        res.status(200).json({
            sucess: true,
            data: {title,description,id:itinearyId},
            message: "itineary is update sucessfuly"

        })
        console.log(fields, result);

       
        
    } catch (error) {
          console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (putitineary)" + error
        })
        
    }
    
}

const delitineary = async(req,res) => {
    try {
        const  itinearyId =req.params.id;
        console.log( itinearyId);
        
        const [rows, fields, result] = await pool.query("DELETE FROM itineary WHERE id=?",
            [ itinearyId]

        )

        res.status(200).json({
            sucess: true,
            data: null,
            message: "itineary is deleated sucessfuly"

        })
        
        
        
    } catch (error) {
         console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (delitineary)" + error
        })
    }
    
}

module.exports = {
    getitineary,
    additineary,
    putitineary,
    delitineary


}