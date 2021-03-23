import { editInvokeTime, editStatus } from '@dbops/editTask';
import { dbID } from '@validateData/dbID';
import { timestampValidate } from '@validateData/timestamp'
import { statusValidate } from '@validateData/status'

async function modifyTaskTime(id : string, new_invoketime : string) : Promise<boolean> {
    return dbID(id)
    .then(res => {
        if (res && timestampValidate(new_invoketime)) {
            return editInvokeTime(id, new_invoketime)
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