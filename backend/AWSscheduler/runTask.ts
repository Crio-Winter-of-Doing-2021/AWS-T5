import { editStatus } from './../dbops/editTask';
import { dbID } from './../validateData/dbID';
import { taskByID } from "../dbops/taskById";
import { invokeLambda } from '../AWSconnect/invokeLambda';
import { triggerLambda } from '../AWSconnect/triggerLambdaHTTP';

async function runTask(taskID: string) : Promise<void> {
    dbID(taskID)
    .then(res => {
        if(res) {
            taskByID(taskID)
            .then(tasks => {
                // if (tasks.length > 0) // removed the check assuming the dbID validation
                const task = tasks[0];
                if (task.accesskeyid && task.accesskeyid != "") {
                    editStatus(taskID, "Running");
                    invokeLambda(task.urlorarn, task.payload, task.accesskeyid, task.secretaccesskey);
                    editStatus(taskID, "Completed");
                } else {
                    editStatus(taskID, "Running");
                    triggerLambda(task.urlorarn, task.payload);
                    editStatus(taskID, "Completed");
                }
            })
            .catch(err => console.error(err));
        } else {
            console.error("Invalid ID");
        }
    })
    .catch(err => console.error(err));
}

export {runTask};