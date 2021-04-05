import { editInvokeTime, editStatus } from '../dbops/editTask';
import { dbID } from '../validateData/dbID';
import { statusValidate } from '../validateData/status';
import { taskByID } from '../dbops/taskById';
import { checkStatus } from './checkStatus';

async function modifyTaskTime(id : string, invoke_delay : number) : Promise<boolean> {
    return dbID(id)
    .then(res => {
        if (res) {
            return checkStatus(id)
            .then(res => {
                if(res=="Scheduled")
                {
                    return taskByID(id)
                    .then( task => {
                        const curr_Date = new Date();
                        const timezoneDiff : number=1000 * 60 * (curr_Date.getTimezoneOffset());
                        curr_Date.setMilliseconds(curr_Date.getMilliseconds()+invoke_delay-timezoneDiff);
                        const new_invokeTime : string = curr_Date.toISOString();
                        // console.log(new_invokeTime);
                        return editInvokeTime(id, new_invokeTime)
                        .then( ress => {
                            return ress;
                        })
                    })
                    .catch( err => { 
                        console.error("Error : " + err);
                        return false;
                    })
                }
                else
                {
                    return false;
                }
            })
        } else {
            console.error("Invalid Parameters");
            return false;
        }
    })
    .catch(err => {
        console.error("Error : "+err);
        return false;
    });
}

async function modifyTaskStatus(id : string, status : string) : Promise<boolean> {
    return dbID(id)
    .then(res => {
        if (res && statusValidate(status)) {
            return editStatus(id, status)
            .then( ress => {
                return ress;
            })
        } else {
            console.error("Invalid Parameters");
            return false;
        }
    })
    .catch(err => {
        console.error("Error : "+err);
        return false;
    });
}

export { modifyTaskTime, modifyTaskStatus };