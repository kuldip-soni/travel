const pool = require("../db/mysql");


const register = async (req, res) => {
    try {
        const { name, email, phone_number, password, dob, gender, address } = req.body;

        console.log(name, email, phone_number, password, dob, gender, address);
        

        const [rows, fields, result] = await pool.query("INSERT INTO user (name, email, phone_number, password, dob, gender, address) VALUES(?,?,?,?,?,?,?)",
            [name, email, phone_number, password, dob, gender, address]

        )

        res.status(200).json({
            sucess: true,
            data: { ...req.body, id: rows.insertId },
            message: "user is add sucessfuly"
        })



        console.log(rows, fields, result);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (register)" + error.message
        })

    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log(email, password);


        const [rows] = await pool.query("SELECT * FROM user");
        console.log(rows);

        let flag = false, user = {}

        rows.map((v) => {

            if (v.email === email && v.password === password) {
                flag = true;
                user = { ...v };
            }
        });

        console.log("user", user, rows);
        

        if (flag === true) {
            res.status(200).json({
                sucess: true,
                data: user,
                message: "login sucessfuly"
            });

        } else {
            res.status(200).json({
                sucess: false,
                data: null,
                message: "email/password wrong"
            })

        }

        console.log(flag);

    } catch (error) {

    }
};

module.exports = {
    register,
    login
}






