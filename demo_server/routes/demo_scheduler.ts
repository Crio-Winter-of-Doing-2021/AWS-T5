import express from 'express';
import { retrieveAllTasks } from './../../library-backend/AWSscheduler/retrieveAllTasks';
import { retrieveTaskInstances } from './../../library-backend/AWSscheduler/retrieveTaskInstances';
import { taskSchedule } from './../../library-backend/AWSscheduler/taskSchedule';
import { cancelTask } from './../../library-backend/AWSscheduler/cancelTask';
// import {modify}
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

router.post('/scheduletask', async (req,res) => {
    try {
        let payload;
        if(req.body.payload === undefined)
        {
            payload = "";
        }
        else {
            payload = req.body.payload;
        }

        let result = await taskSchedule(req.body.url,req.body.delay,"","",payload);
        res.status(200).send(result);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
})

router.post('/canceltask', async (req,res) => {
    try {
        let result = await cancelTask(req.body.id);
        res.status(200).send(result);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
})

router.post('/modifytask', async (req,res) => {
    try {

    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
})

export default router;