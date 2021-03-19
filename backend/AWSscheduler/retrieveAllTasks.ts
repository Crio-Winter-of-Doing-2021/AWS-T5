import { allTasks } from './../dbops/allTasks';

async function retrieveAllTasks(): Promise<unknown> {
    try {
        const res = await allTasks();
        return res;
    }
    catch(err) {
        console.log("Error : " + err);
        return err;
    }
}

export { retrieveAllTasks };