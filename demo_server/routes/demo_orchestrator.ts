import express from 'express';
import {getTasks,editTask , scheduleOrchestration} from './../../orchestrator-library/orchestrator/interfaceCRUD'
import {insertdata1,retrievedata1} from './../dbops1';

const router = express.Router();

router.get('/getorchetration/:userid', async (req,res) => {
    try {
        let res1 = await getTasks({});
        let result : Array<{id:string,orchestratorlist:string,name:string,status:string,invoke_time:string,payload:string}>=[];
        let res2=await retrievedata1(req.params.userid);
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
        console.log("Error : " + err );
        res.sendStatus(500);
    }
})

router.post('/orchestrate',async (req,res) => {
    try {
        let payload;
        if(req.body.payload === undefined)
        {
            payload = "{}";
        }
        else {
            payload = req.body.payload;
        }
        console.log(typeof(req.body.delay))
        console.log(req.body.url +"@" +req.body.name+"$"+req.body.delay );
        // console.log('hello1')
        const result :number = await scheduleOrchestration(req.body.url,req.body.name,req.body.delay,payload)
        // console.log('hello2')
        // console.log(result);
        let data = {
            result
        }
        insertdata1(result.toString(),req.body.userid);
        // console.log(result);
        res.status(200).send(data);
        
    }
    catch(err) {
        console.log("Error : " + err );
        res.sendStatus(500);
    }
})

router.post('/cancelorchestration',async (req,res) => {
    try {
        let id = req.body.id;
        // console.log(id);
        let result = await getTasks({status : 'Scheduled'});
        let res1;
        let temp=false;
        for(let i=0;i<result.length;i++)
        {
            // console.log('hello');
            // console.log(result[i].id);
            if(result[i].id==id)
            {
                // console.log('hello1');
                temp=true;
                res1 = await editTask({taskID : id,newStatus:'Canceled'})
                break;
            }
        }
        // res.status(500).send(false);
        if(temp)
        {
            res.status(200).send(res1);
        }
        else
        {
            res.status(500).send(false);
        }
    }
    catch(err) {
        console.log("Error : "+err);
        res.status(500).send(false);
    }
})

router.post('/modifydelay',async (req,res) => {
    try {
        let id=req.body.id;
        let delay = req.body.delay;
        let result = await getTasks({status : 'Scheduled'});
        let res1;
        let temp=false;
        for(let i=0;i<result.length;i++)
        {
            // console.log('hello');
            // console.log(result[i].id);
            if(result[i].id==id)
            {
                // console.log('hello1');
                temp=true;
                res1 = await editTask({taskID : id,invoke_delay : delay});
                break;
            }
        }
        // res.status(500).send(false);
        if(temp)
        {
            res.status(200).send(res1);
        }
        else
        {
            res.status(500).send(false);
        }
    }
    catch(err) {
        console.log("Error : " + err);
        res.sendStatus(500);
    }
})

export default router;