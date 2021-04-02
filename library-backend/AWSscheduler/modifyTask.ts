import { editInvokeTime, editStatus } from '../dbops/editTask';
import { dbID } from '../validateData/dbID';
import { statusValidate } from '../validateData/status';
import { taskByID } from '../dbops/taskById';

async function modifyTaskTime(id : string, invoke_delay : number) : Promise<boolean> {
    return dbID(id)
    .then(res => {
        if (res) {
            return taskByID(id)
            .then( task => {
                const invokeTime: Date = new Date(task[0].invoke_time);
                // console.log(invokeTime);
                const newTime: number = invokeTime.getTime() + invoke_delay;
                const new_invokeTime = new Date(newTime).toISOString();
                // console.log(new_invokeTime);
                return editInvokeTime(id, new_invokeTime)
                .then( ress => {
                    return ress;
                })
            })
            .catch( err => { 
                console.error(err);
                return false;
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