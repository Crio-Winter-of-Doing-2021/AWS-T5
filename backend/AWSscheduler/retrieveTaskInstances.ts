import { tasksByStatus } from './../dbops/tasksByStatus';
import { statusValidate } from './../validateData/status';

async function retrieveTaskInstances(taskStatus :string) {
    if(!statusValidate(taskStatus))
    {
        console.log('Status Invalid');
        return false;
    }
    try {
        let res = await tasksByStatus(taskStatus);
        return res;
    }
    catch(err) {
        console.log('Error : '+err);
    }
}

export { retrieveTaskInstances }