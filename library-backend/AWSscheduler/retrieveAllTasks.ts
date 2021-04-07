import { allTasks } from '../dbops/allTasks';

async function retrieveAllTasks(): Promise<Array<{id:string,urlorarn:string,status:string,name:string,accesskeyid:string,secretaccesskey:string,invoke_time:string,payload:string}>> {
    try {
        return allTasks();
    }
    catch(err) {
        console.log("Error : " + err);
        return err;
    }
}

export { retrieveAllTasks };