const express = require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');


dotenv.config();
//connect to DB
mongoose.connect(process.env.DB_CONNECT,
{ useUnifiedTopology: true },
()=>console.log("connected to DB")
);

const authRoute=require('./routes/auth');
const postRoute = require('./routes/post');

app.use(express.json());
//Route Middleware
app.use('/api/user',authRoute); 
app.use('/api/post',postRoute); 

app.listen(3000,()=>console.log("server is running!"));