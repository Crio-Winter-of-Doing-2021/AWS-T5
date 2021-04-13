import { scheduleTask } from './../dbops/scheduleTask';
import { ARNValidate } from './../validateData/ARN';
import { accessKeyIDValidate } from './../validateData/accessKeyID';
import { timestampValidate } from './../validateData/timestamp';
import { triggerURLValidate } from './../validateData/triggerURL';

async function taskSchedule(triggerURLOrARN: string, delay: number, name = "", accessKeyID = "", secretAccessKey = "", payload = "{}"): Promise<any> {
    
    delay = Math.floor(delay);
    if(delay <= 0) {
        console.log('Invalid Time');
        return false;
    }
    const curr_Date: Date = new Date();
    const timezoneDiff: number = 1000 * 60 * (curr_Date.getTimezoneOffset());
    curr_Date.setMilliseconds(curr_Date.getMilliseconds() + delay - timezoneDiff);
    const invoke_time: string = curr_Date.toISOString();
    // console.log(invoke_time);

    if(!timestampValidate(invoke_time))
    {
        console.log('Invalid Time');
        return false;
    }
    if(accessKeyID === "")
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
        if(!accessKeyIDValidate(accessKeyID))
        {
            console.log('Invalid Access Key ID');
            return false;
        }
    }
    try {
        const id = scheduleTask(triggerURLOrARN, invoke_time , name, accessKeyID, secretAccessKey, payload)
        .then(res => {
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