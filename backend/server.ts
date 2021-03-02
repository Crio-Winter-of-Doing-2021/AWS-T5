// importing modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// defining express app
const app=express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cors());

//defining port and starting the server on that port
const PORT = 5000;
app.listen(PORT,() => console.log(`Server Started on PORT ${PORT}`))