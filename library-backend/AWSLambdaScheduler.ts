import { invokeLambda } from './AWSconnect/invokeLambda';
import { triggerLambda } from './AWSconnect/triggerLambdaHTTP';
import { dbInit } from './dbops/dbInit';
import { taskSchedule } from './AWSscheduler/taskSchedule';
import {cancelTask} from './AWSscheduler/cancelTask';
import { checkStatus } from './AWSscheduler/checkStatus';
import { retrieveAllTasks } from './AWSscheduler/retrieveAllTasks';
import { retrieveTaskInstances } from './AWSscheduler/retrieveTaskInstances';
interface invokeLambdaInterface {
    ARN: string,
    Payload: string,
    accessKeyID: string,
    secretAccessKey: string
}
interface triggerLambdaInterface {
    triggerURL: string,
    payloadData: Record<string, unknown>
}
interface scheduleInterface {
    triggerURL?: string,
    invoke_time : string,
    ARN? : string,
    accessKeyID?: string,
    secretAccessKey?: string
}
interface cancelInterface {
    taskID : string
}
interface checkStatusInterface {
    taskID : string
}
interface modifyInterface {
    taskID : string,
    time : number
}
interface taskInstancesInterface {
    taskStatus : string
}
class AWSLambdaScheduler {
    constructor() {
        dbInit();
    }
    invokeLambda(obj: invokeLambdaInterface) {
        invokeLambda(obj.ARN,obj.Payload,obj.accessKeyID,obj.secretAccessKey);
    }
    triggerLambda(obj: triggerLambdaInterface) {
        triggerLambda(obj.triggerURL,obj.payloadData);
    }
    taskSchedule(URLorARN:string,delay:number,accessKeyID = "",secretAccessKey="",payload="") {
        return taskSchedule(URLorARN,delay,accessKeyID,secretAccessKey,payload);
    }
    cancel(id:string) {
        return cancelTask(id);
    }
    checkStatus(id:string) {
        return checkStatus(id)
    }
    modify(obj :modifyInterface) {
        //modify logic
    }
    retrieveTaskInstances(status:string) {
        retrieveTaskInstances(status);
    }
    retrieveAllTasks() {
        retrieveAllTasks();
    }
}
export default AWSLambdaScheduler;