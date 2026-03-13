require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json());

app.get('/getlocation', (req, res) => {
  res.send('Hello Node!')
})

app.post('/addlocation',(req,res) => {
    console.log(req.body);

    res.status(200).json({
    sucess:true,
    data:req.body,
    message:"loaction is add sucessfuly"

})

})

app.put('/putlocation/:id',(req,res)=>{
    console.log(req.params.id,req.body);

    res.status(200).json({
    sucess:true,
    data:req.body,
    message:"loaction is update sucessfuly"

})

})
    
    



    
app.listen(process.env.PORT, () => {


  console.log(`server is listening ${process.env.PORT}`)
})

