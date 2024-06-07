const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');

dotenv.config();
connectDB()
const app = express();


app.get('/',(req,res)=>{
    res.send("Hello Owrld");
})


app.use('/api/v1/auth',authRoute);


app.listen(process.env.PORT,()=>{
    console.log('server running on port 8080')
})