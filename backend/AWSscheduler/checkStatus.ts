import {checkTaskStatus} from './../dbops/checkTaskStatus';
import {dbID} from './../validateData/dbID'

async function checkStatus(id:string) {
    if(!dbID(id))
    {
        console.log('Invalid ID');
        return false;
    }
    try {
        let status =  await checkTaskStatus(id);
        return status;
    }
    catch(err) {
        console.log('Error : '+ err);
        return err;
    }
}

export { checkStatus };