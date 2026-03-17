require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Router = require("./routes/index")


app.use(express.json());

app.use(cors())

app.use("/", Router);






app.listen(process.env.PORT, () => {


  console.log(`server is listening ${process.env.PORT}`)
})

