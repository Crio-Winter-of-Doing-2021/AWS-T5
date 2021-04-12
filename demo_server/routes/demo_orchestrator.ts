import express from 'express';
import {getTasks,editTask , scheduleOrchestration} from './../../orchestrator-library/orchestrator/interfaceCRUD'

const router = express.Router();

router.get('/getorchetration', async (req,res) => {
    try {
        let result = await getTasks({});
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
        const result = await scheduleOrchestration(req.body.url,req.body.name,req.body.delay,payload)
        // console.log('hello2')
        // console.log(result);
        let data = {
            result
        }
        res.status(200).send(data);
        
    }
    catch(err) {
        console.log("Error : " + err );
        res.sendStatus(500);
    }
})

export default router;