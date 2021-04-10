import { exec } from 'child_process'
import { editStatus } from '../dbops/modifyTask'
import fs from 'fs'
import { getDefaultSettings } from 'node:http2'

function triggerLambda(task: { id: string; orchestratorlist: string; payload: string; }): void {
    editStatus(task.id, 'Running')
    const orchestratorList: string[] = task.orchestratorlist.replace(/\s+/g, '').split('|')
    const curlStatement0 =  `curl -X POST -H 'Content-Type: application/json' -d '${task.payload}' ${orchestratorList[0]}`
    exec(curlStatement0, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
    });
    const passConditionPath = "./passCondition.txt";
    fs.writeFileSync(passConditionPath, "true", {flag: 'w+'})
    for ( let i = 1; i < orchestratorList.length; i += 3 ) {
        if (fs.readFileSync(passConditionPath, 'utf8') == "true") {
            const testLambda = orchestratorList[i];
            const successLambda = orchestratorList[i+1];
            const failureLambda = orchestratorList[i+2];
            let curlStatement = (lambdaURL: string, payload: string) => {
                return `curl -X POST -H 'Content-Type: application/json' -d '${payload}' ${lambdaURL}`
            }
            exec(curlStatement(testLambda, task.payload), (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    editStatus(task.id, "Failed");
                    fs.writeFileSync(passConditionPath, "false", {flag: 'w+'})
                } 
                if (stdout) {
                    if( stdout.toLowerCase() == '\"true\"' ) {
                        exec(curlStatement(successLambda, task.payload), (error, stdout, stderr) => {
                            if (error) {
                                console.log(`error: ${error.message}`);
                            }
                        });
                    } else {
                        fs.writeFileSync(passConditionPath, "false", {flag: 'w+'})
                        editStatus(task.id, `Failed at test: ${Math.floor(i / 3) + 1}`)
                        exec(curlStatement(failureLambda, task.payload), (error, stdout, stderr) => {
                            if (error) {
                                console.log(`error: ${error.message}`);
                            }
                        });
                    }
                }
                // if (stderr) {
                //     console.log(` stderr: ${stderr}`);
                // }
            })
        }
    }
    if (fs.readFileSync(passConditionPath, 'utf8') == "true") {
        editStatus(task.id, 'Completed')
    }
}

export {triggerLambda}