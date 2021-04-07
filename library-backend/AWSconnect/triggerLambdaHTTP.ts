/**
 * For HTTP calls to trigger your lambda endpoint, with open access. 
 * Get the Trigger by "Add Trigger" on your function console.
 * To avoid open access triggers ( hence saving costs ), use invokeLambda.ts
 */
 
 import { exec } from 'child_process';
 import {editStatus} from '../dbops/editTask'

 function triggerLambda(task: {id: string, urlorarn: string, payload: string}): void {
    editStatus(task.id.toString(), 'Running')
    const curlStatement =  `curl -Li -X POST -H 'Content-Type: application/json' -d '${task.payload}' ${task.urlorarn} | head -n 1 | cut -d$' ' -f2`
    exec(curlStatement, (error, stdout, stderr) => {
        // console.log(curlStatement)
        if (error) {
            console.log(`error: ${error.message}`);
        }
        if (stderr) {
            // console.log(`stderr: ${stderr}`);
        }
        if (stdout) {
            if(Number(stdout) < 400){
                console.log(task.id.toString())
                editStatus(task.id.toString(), 'Completed')
            } else {
                editStatus(task.id.toString(), 'Failed')
            }
        }
    });
 }
 
 export {triggerLambda}