import { Client } from "pg";
import { connectionstring } from "./connectDB";

async function editInvokeTime(taskID: string, newInvokeTime: string) : Promise<boolean> {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        const ret = client.query(
            `UPDATE scheduler
            SET invoke_time = '${newInvokeTime}'
            WHERE id = '${taskID}';
            `).then(res => {
                return true;
            }).catch(err => {
                return false;
            });
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
            `UPDATE scheduler
            SET status = '${newStatus}'
            WHERE id = '${taskID}';
            `).then(res => {
                return true;
            }).catch(err => {
                return false;
            });
        return ret;
    } catch (err) {
        console.error("Task not edited properly", err);
        return false;
    }
}

export { editInvokeTime, editStatus };