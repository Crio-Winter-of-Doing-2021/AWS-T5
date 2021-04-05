import express from 'express';
import { retrieveAllTasks } from './../../library-backend/AWSscheduler/retrieveAllTasks';
import { taskSchedule } from './../../library-backend/AWSscheduler/taskSchedule';
import { cancelTask } from './../../library-backend/AWSscheduler/cancelTask';
import { modifyTaskTime } from './../../library-backend/AWSscheduler/modifyTask';
import { stringify } from 'querystring';
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

        let result = await taskSchedule(req.body.url,req.body.delay,req.body.name,"","",payload);
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
        modifyTaskTime(req.body.id,req.body.delay).then(ress => {
            res.status(200).send(ress);
        })
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
})

export default router;