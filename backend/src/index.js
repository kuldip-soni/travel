require('dotenv').config()
const express = require('express')
const app = express()
const Router = require("./routes/index")

app.use(express.json());


app.use("/", Router);





app.listen(process.env.PORT, () => {


  console.log(`server is listening ${process.env.PORT}`)
})

