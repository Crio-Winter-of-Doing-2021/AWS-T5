import express from 'express';
import { retrieveAllTasks } from './../../library-backend/AWSscheduler/retrieveAllTasks';
import { taskSchedule } from './../../library-backend/AWSscheduler/taskSchedule';
import { cancelTask } from './../../library-backend/AWSscheduler/cancelTask';
import { modifyTaskTime } from './../../library-backend/AWSscheduler/modifyTask';
import { insertdata , retrievedata } from './../dbops';
const router = express.Router();

router.get('/alltasks/:userid',async (req,res) => {
    try {
        // console.log(req.params.userid);
        let res1 = await retrieveAllTasks();
        let result : Array<{id:string,urlorarn:string,status:string,name:string,accesskeyid:string,secretaccesskey:string,invoke_time:string,payload:string}>=[];
        let res2= await retrievedata(req.params.userid);
        // console.log(res1);
        // console.log(res2);
        for(let i=0;i<res2.length;i++)
        {
            for(let j=0;j<res1.length;j++)
            {
                if(res1[j].id==res2[i].id)
                {
                    result.push(res1[j]);
                }
            }
        }
        // console.log(result);
        res.status(200).send(result);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    } 
})

router.post('/scheduletask', async (req,res) => {
    try {
        if(req.body.userid===undefined)
        {
            res.sendStatus(500);
        }
        let payload;
        if(req.body.payload === undefined)
        {
            payload = "";
        }
        else {
            payload = req.body.payload;
        }

        let result = await taskSchedule(req.body.url,req.body.delay,req.body.name,"","",payload);
        // console.log(result.id);
        insertdata(result.id,req.body.userid);
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