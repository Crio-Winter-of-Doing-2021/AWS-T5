import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import demo_scheduler from './routes/demo_scheduler';


const app=express();

app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use('/',demo_scheduler);
const PORT = 8081

app.listen(PORT,() =>console.log(`Server Started on ${PORT}`));