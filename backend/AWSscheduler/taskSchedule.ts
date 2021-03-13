import { scheduleTask } from './../dbops/scheduleTask';
import { ARNValidate } from './../validateData/ARN';
import { accessKeyIDValidate } from './../validateData/accessKeyID';
import { timestampValidate } from './../validateData/timestamp';
import { triggerURLValidate } from './../validateData/triggerURL';
import { runTask } from './runTask';

async function taskSchedule(triggerURLOrARN: string, invoke_time: string, acecssKeyID: string = "", secretAccessKey: string ="") {
    
    if(!timestampValidate(invoke_time))
    {
        console.log('Invalid Time');
        return false;
    }
    if(acecssKeyID === "")
    {
        if(!triggerURLValidate(triggerURLOrARN))
        {
            console.log('Invalid URL');
            return false;
        }
    }
    else
    {
        if(!ARNValidate(triggerURLOrARN))
        {
            console.log('Invalid ARN');
            return false;
        }
        if(!accessKeyIDValidate(acecssKeyID))
        {
            console.log('Invalid Access Key ID');
            return false;
        }
    }
    try {
        let id = scheduleTask(triggerURLOrARN,invoke_time,acecssKeyID,secretAccessKey).then(res => {
            runTask();
            return res;
        });
        // await runTask();
        return id;
    }
    catch(err) {
        console.log("Error : "+err);
        return err;
    }
}

export { taskSchedule };