import {checkTaskStatus} from '../dbops/checkTaskStatus';
import {dbID} from '../validateData/dbID'

async function checkStatus(id:string) : Promise<string> {
    return dbID(id)
    .then(res => {
        if (res == true) { 
            return checkTaskStatus(id)
            .then(res => {
                return res.status;
            });
        } else {
            console.error("ID not valid");
            return "";
        }
    })
    .catch(err => {
        console.log("Error : "+ err);
        return "";
    });
}

export { checkStatus };