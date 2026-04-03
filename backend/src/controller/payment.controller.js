const pool = require("../db/mysql");


const getPayment = async (req, res) => {
    try {
        const [rows, fields, result] = await pool.query("SELECT * FROM payment")

        res.status(200).json({
            sucess: true,
            data: rows,
            message: "payment fetched sucessfuly"
        })



        console.log(rows, fields, result);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (getPayment)" + error.message
        })

    }


}

const addPayment = async (req, res) => {
    try {
        console.log(req.body);
        
        const {  user_id,booking_id,transaction_id,mode, date,amount, status } = req.body;

        console.log( mode, date,amount);


        const [rows, fields, result] = await pool.query("INSERT INTO payment (user_id,booking_id,transaction_id, mode, date,amount, status) VALUES(?,?,?,?,?,?,?)",
            [ user_id,booking_id,transaction_id,mode, date,amount, status]

        )

        await pool.query(`UPDATE booking SET status='payment_complete' WHERE id=${booking_id}`);

        await pool.query("INSERT INTO transport(booking_id) VALUES(?)", [booking_id]);

        await pool.query("INSERT INTO hotel(booking_id) VALUES(?)", [booking_id]);

        await pool.query("INSERT INTO restaurant(booking_id) VALUES(?)", [booking_id]);

        res.status(200).json({
            sucess: true,
            data: { ...req.body, id: rows.insertId },
            message: "payment sucessfuly"
        })



        console.log(rows, fields, result);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (payment)" + error.message
        })

    }


}

const putPayment =async (req,res) => {
    try {
       console.log("req.body", req.params.id);
        // console.log(req.body, req.file.path);

       const {  transaction_id,mode, date,amount } = req.body;

        console.log(transaction_id,mode, date,amount, req.params.id);
        


       const [rows] = await pool.query("UPDATE  payment  SET transaction_id=?, mode=?, date=?,amount=? WHERE id=?",
            [transaction_id,mode, date,amount, req.params.id]

        )

        console.log(rows);
        

        res.status(200).json({
            sucess: true,
            data: {  transaction_id,mode, date,amount, id: req.params.id },
            message: "payment is update sucessfuly"

        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (putPayment)" + error.message
        })
        
    }
    
}



module.exports = {
    getPayment,
    addPayment,
    putPayment
}
