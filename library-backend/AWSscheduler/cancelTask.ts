import {editStatus} from '../dbops/editTask';
import {dbID} from '../validateData/dbID'
import { checkStatus } from './checkStatus';


async function cancelTask(id : string) : Promise<boolean> {
    return dbID(id)
    .then(res => {
        if (res == true) { 
            return checkStatus(id)
            .then(res => {
                if(res=="Scheduled")
                {
                    editStatus(id,'Canceled')
                    return true;
                }
                else
                {
                    return false;
                }
            })
        } else {
            console.error("ID not valid");
            return false;
        }
    })
    .catch(err => {
        console.log("Error : "+ err);
        return false;
    });
}
export { cancelTask };