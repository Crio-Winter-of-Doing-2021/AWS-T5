import { tasksByStatus } from './../dbops/tasksByStatus';
import { statusValidate } from './../validateData/status';

async function retrieveTaskInstances(taskStatus :string) : Promise<boolean | void> {
    if(!statusValidate(taskStatus))
    {
        console.log('Status Invalid');
        return false;
    }
    try {
        const res = await tasksByStatus(taskStatus);
        return res;
    }
    catch(err) {
        console.log('Error : '+err);
    }
}

export { retrieveTaskInstances }