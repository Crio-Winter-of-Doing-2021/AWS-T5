import {editStatus} from '../dbops/editTask';
import {dbID} from '../validateData/dbID'


async function cancelTask(id : string) : Promise<boolean> {
    return dbID(id)
    .then(res => {
        if (res == true) { 
            editStatus(id, 'Cancelled');
            return true;
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