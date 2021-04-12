import { allTasks, taskByStatus, taskByID } from '../dbops/getTaskFilter'
import { editInvokeTime, editStatus } from '../dbops/modifyTask'
import { setInvoke } from '../dbops/setInvoke'
import { validStatus, validOrchestratorList, validName, validPayload } from './validate'

interface taskArgs {
    status?: string;
    taskID?: number;
}

function getTasks(inParams: taskArgs) {
    if (inParams.status && validStatus(inParams.status)) {
        return taskByStatus(inParams.status)
        .then(res => {return res;});
    } 
    if (inParams.taskID) { // automatically validated by number type
        const parsedTaskID: number = Number.parseInt((inParams.taskID).toString())
        return taskByID(parsedTaskID)
        .then(res => {return res;});
    }
    return allTasks()
    .then(res => {return res});
}

interface editArgs {
    taskID: number,
    invoke_delay?: number,
    newStatus?: string
}

function editTask(inParams: editArgs) {
    if (inParams.newStatus && validStatus(inParams.newStatus)) {
        return editStatus( inParams.taskID.toString(), inParams.newStatus)
        .then(res => {return res;});
    } 
    if (inParams.invoke_delay) {
        const parsedDelay: number = Math.abs(Math.floor(inParams.invoke_delay))
        return editInvokeTime( inParams.taskID.toString(), parsedDelay)
        .then(res => {return res;});
    }
    return new Promise(() => {return {}});
}

function scheduleOrchestration(orchestratorList: string, name: string, delay: number, payload: string) : Promise<number> {
    const parsedDelay: number = Math.abs(Math.floor(delay));
    if (validOrchestratorList(orchestratorList) && validName(name) && validPayload(payload)) {
        return setInvoke(orchestratorList, name, delay, payload)
        .then(res => {return res;});
    }
    return new Promise(() => {return 0});
}

export { getTasks, editTask, scheduleOrchestration }