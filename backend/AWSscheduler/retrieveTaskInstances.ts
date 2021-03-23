import { tasksByStatus } from '@dbops/tasksByStatus';
import { statusValidate } from '@validateData/status';

async function retrieveTaskInstances(taskStatus :string) : Promise<boolean | void> {
    if(!statusValidate(taskStatus))
    {
        console.log('Status Invalid');
        return false;
    }
    try {
        return await tasksByStatus(taskStatus);
    }
    catch(err) {
        console.error('Error : ' + err);
    }
}

export { retrieveTaskInstances }