const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');
const cors = require('cors')
const morgan = require('morgan');
const courseRoute = require('./routes/courseRoute');

dotenv.config();
connectDB()
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/',(req,res)=>{
    res.send("Hello Owrld");
})


app.use('/api/v1/auth',authRoute);
app.use('/api/v1/course',courseRoute);


app.listen(process.env.PORT,()=>{
    console.log('server running on port 8080')
})