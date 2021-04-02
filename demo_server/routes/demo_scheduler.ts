import express from 'express';
import { retrieveAllTasks } from './../../library-backend/AWSscheduler/retrieveAllTasks';
const router = express.Router();

router.get('/alltasks',async (req,res) => {
    try {
        let result = await retrieveAllTasks();
        res.status(200).send(result);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    } 
})



export default router;