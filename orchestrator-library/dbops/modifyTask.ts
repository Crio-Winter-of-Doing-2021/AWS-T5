import { connectionstring } from "./connectDB"
import { backupDB } from "./backupDB"
import { Client } from "pg";

async function editInvokeTime(taskID: string, invoke_delay: number) : Promise<boolean> {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        const curr_Date = new Date();
        const timezoneDiff : number=1000 * 60 * (curr_Date.getTimezoneOffset());
        curr_Date.setMilliseconds(curr_Date.getMilliseconds() + invoke_delay - timezoneDiff);
        const newInvokeTime : string = curr_Date.toISOString();
        const ret = client.query(
            `UPDATE orchestrator
            SET invoke_time = '${newInvokeTime}'
            WHERE id = '${taskID}';
            `).then(res => {
                return true;
            }).catch(err => {
                return false;
            });
        backupDB();
        return ret;
    } catch (err) {
        console.error("Task not edited properly", err);
        return false;
    }
}

async function editStatus(taskID: string, newStatus: string) : Promise<boolean> {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        const ret= client.query(
            `UPDATE orchestrator
            SET status = '${newStatus}'
            WHERE id = '${taskID}';
            `).then(res => {
                return true;
            }).catch(err => {
                return false;
            });
        backupDB();
        return ret;
    } catch (err) {
        console.error("Task not edited properly", err);
        return false;
    }
}

export { editInvokeTime, editStatus };