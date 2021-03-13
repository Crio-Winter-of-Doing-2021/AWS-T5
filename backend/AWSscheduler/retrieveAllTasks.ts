import { allTasks } from './../dbops/allTasks';

async function retrieveAllTasks() {
    try {
        let res = await allTasks();
        return res;
    }
    catch(err) {
        console.log("Error : "+err);
        return err;
    }
}

export { retrieveAllTasks };