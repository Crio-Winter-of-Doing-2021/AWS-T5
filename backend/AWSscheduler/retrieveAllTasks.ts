import { allTasks } from '@dbops/allTasks';

async function retrieveAllTasks(): Promise<unknown> {
    try {
        return allTasks();
    }
    catch(err) {
        console.log("Error : " + err);
        return err;
    }
}

export { retrieveAllTasks };