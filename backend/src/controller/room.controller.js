const { error } = require("console");
const pool  = require("../db/mysql");
const fs = require('fs');



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
       const {name,description,price,room_img}=req.body;
       console.log(name,description,price,room_img);
       
        const [rows,fields,result] = await pool.query("INSERT INTO room (name,description,price,room_img) VALUES(?,?,?,?)", 
        [name,description,price,req.file.path]

    )
       
      res.status(200).json({
             sucess: true,
             data: {...req.body, id: rows.insertId,room_img:req.file.path},
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

const putroom = async(req,res) => {
    try {
console.log("req.body");
        const { name,description,price,room_img } = req.body;
        const roomId = req.params.id;
        console.log(name,description,price,room_img, roomId);

        const [rows] = await pool.query(`SELECT * FROM room WHERE id=${roomId}`);
        let fileimg = '';

        if (req.file) {

            fs.unlinkSync(rows[0].room_img, (error) => {
                console.log(error);

            })
            fileimg = req.file.path;
        } else {
            fileimg = rows[0].room_img
        }

        await pool.query("UPDATE  room  SET name=?,description=?,price=?,room_img=? WHERE id=?",
            [name,description,price, fileimg, roomId]
        )

        res.status(200).json({
            sucess: true,
            data: { id: roomId, name,description,price, room_img: fileimg },
            message: "room is update sucessfuly"

        })
       
        
    } catch (error) {
          console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (putroom)" + error
        })
        
    }
    
}

const delroom =async (req,res) => {
    try {
 console.log("delroom");
         // const { city, state, country, room_img } = req.body;
        const roomId = req.params.id;
        // console.log(roomId);

        const [rows] = await pool.query(`SELECT * FROM room WHERE id=${roomId}`);

        fs.unlinkSync(rows[0].room_img, (error) => {
            console.log(error);

        })

        await pool.query("DELETE FROM room WHERE id=?",
            [roomId]

        )

        res.status(200).json({
            sucess: true,
            data: null,
            message: "room is deleated sucessfuly"

        })
        
        
    } catch (error) {
         console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (delroom)" + error
        })
    }
    
}

module.exports = {
    getroom,
    addroom,
    putroom,
    delroom


}