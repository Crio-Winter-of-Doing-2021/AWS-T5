// importing modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//Connecting Database
import connectDB from './dbops/dbConnect';
connectDB();

// defining express app
const app: express.Application = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cors());

//defining port and starting the server on that port
const PORT: Number = Number(5000);
app.listen(PORT,() => console.log(`Server Started on PORT ${PORT}`))