const { error } = require("console");
const pool = require("../db/mysql");
const fs = require('fs');





const getblog = async (req, res) => {
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
            message: "internal server error (getblog)" + error

        })

    }


}

const addblog = async (req, res) => {
    try {
        console.log("req.body");
        console.log("dddddd",req.body, req.file.path);

        const { title, date, description, blog_img } = req.body;
        console.log(title, date, description, blog_img);

        const [rows, fields, result] = await pool.query("INSERT INTO blog (title,date,description,blog_img) VALUES(?,?,?,?)",
            [title, date, description, req.file.path]

        )

        res.status(200).json({
            sucess: true,
            data: { ...req.body, id: rows.insertId,blog_img: req.file.path },
            message: "blog is add sucessfuly"
        })



        console.log(rows, fields, result);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (getblog)" + error.message
        })

    }

}

const putblog = async(req, res) => {
    try {
        console.log("req.body");
        const { title, date, description, blog_img } = req.body;
        const blogId = req.params.id;
        console.log(title, date, description, blog_img, blogId);

        const [rows] = await pool.query(`SELECT * FROM blog WHERE id=${blogId}`);
        let fileimg = '';

        if (req.file) {

            fs.unlinkSync(rows[0].blog_img, (error) => {
                console.log(error);

            })
            fileimg = req.file.path;
        } else {
            fileimg = rows[0].blog_img
        }

        await pool.query("UPDATE  blog  SET  title=?,date=?,description=?,blog_img=? WHERE id=?",
            [title, date, description, fileimg, blogId]
        )

        res.status(200).json({
            sucess: true,
            data: { id: blogId, title, date, description, blog_img: fileimg },
            message: "blog is update sucessfuly"

        })

    } catch (error) {
         console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (putblog)" + error
        })

    }

}

const delblog = async(req, res) => {
    try {
        console.log("delblog");
         // const { city, state, country, blog_img } = req.body;
        const blogId = req.params.id;
        // console.log(blogId);

        const [rows] = await pool.query(`SELECT * FROM blog WHERE id=${blogId}`);

        fs.unlinkSync(rows[0].blog_img, (error) => {
            console.log(error);

        })

        await pool.query("DELETE FROM blog WHERE id=?",
            [blogId]

        )

        res.status(200).json({
            sucess: true,
            data: null,
            message: "blog is deleated sucessfuly"

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (delblog)" + error
        })

    }

}

module.exports = {
    getblog,
    addblog,
    putblog,
    delblog


}