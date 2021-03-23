import { scheduleTask } from '@dbops/scheduleTask';
import { ARNValidate } from '@validateData/ARN';
import { accessKeyIDValidate } from '@validateData/accessKeyID';
import { timestampValidate } from '@validateData/timestamp';
import { triggerURLValidate } from '@validateData/triggerURL';
import { runTask } from '@AWSscheduler/runTask';

async function taskSchedule(triggerURLOrARN: string, delay: number, acecssKeyID = "", secretAccessKey = ""): Promise<boolean> {
    
    delay = Math.floor(delay);
    if(delay <= 0) {
        console.log('Invalid Time');
        return false;
    }
    const curr_Date: Date = new Date();
    curr_Date.setMilliseconds(curr_Date.getMilliseconds() + delay);
    const invoke_time: string = curr_Date.toISOString();
    // console.log(invoke_time);

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
        const id = scheduleTask(triggerURLOrARN, invoke_time, acecssKeyID, secretAccessKey)
        .then(res => {
            runTask();
            return res;
        });
        return id;
    }
    catch(err) {
        console.log("Error : "+err);
        return err;
    }
}

export { taskSchedule };