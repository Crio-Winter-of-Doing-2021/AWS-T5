import {editStatus} from './../dbops/editTask';
import {dbID} from './../validateData/dbID'


async function cancelTask(id:string) {
    if(!dbID(id))
    {
        console.log('Invalid ID');
        return false;
    }
    try {
        await editStatus(id,'Cancelled');
        return true;
    }
    catch(err) {
        console.log("Error : "+ err);
        return false;
    }
}
export { cancelTask };