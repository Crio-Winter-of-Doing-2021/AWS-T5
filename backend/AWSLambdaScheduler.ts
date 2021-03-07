import { invokeLambda } from './AWSconnect/invokeLambda';
import { triggerLambda } from './AWSconnect/triggerLambdaHTTP';
interface invokeLambdaInterface {
    ARN: string,
    Payload: string,
    accessKeyID: string,
    secretAccessKey: string
}
interface triggerLambdaInterface {
    triggerURL: string,
    payloadData: any
}
interface scheduleInterface {
    taskURL: string,
    time : number
}
interface cancelInterface {
    taskID : number
}
interface checkStatusInterface {
    taskID : number
}
interface modifyInterface {
    taskID : number,
    time : number
}
interface taskInstancesInterface {
    taskStatus : string
}
class AWSLambdaScheduler {
    
    invokeLambda(obj: invokeLambdaInterface) {
        invokeLambda(obj.ARN,obj.Payload,obj.accessKeyID,obj.secretAccessKey);
    }
    triggerLambda(obj: triggerLambdaInterface) {
        triggerLambda(obj.triggerURL,obj.payloadData);
    }
    taskSchedule(obj: scheduleInterface) {
        //taskSchedule logic
    }
    cancel(obj: cancelInterface) {
        //cancel logic
    }
    checkStatus(obj : checkStatusInterface) {
        //checkStatus logic
    }
    modify(obj :modifyInterface) {
        //modify logic
    }
    retrieveTaskInstances(obj : taskInstancesInterface) {
        //retrieveTaskInstances logic
    }
    retrieveAllTasks() {
        //retrieveAllTasks
    }
}
export default AWSLambdaScheduler;