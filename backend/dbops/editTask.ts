import { Client } from "pg";
import { connectionstring } from "./connectDB";

async function editInvokeTime(taskID: string, newInvokeTime: string) {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        let ret: any = client.query(
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
    }
}

async function editStatus(taskID: string, newStatus: string) {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        let ret: any = client.query(
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
    }
}

export { editInvokeTime, editStatus };