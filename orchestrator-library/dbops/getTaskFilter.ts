import { Client } from "pg";
import { connectionstring } from "./connectDB";

async function allTasks() {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        const ret: any = client.query(
            `SELECT * FROM orchestrator
            ORDER BY id ASC;
            `).then(res => {
                return res.rows;
            }).catch(err => console.log("Query Error" + err));
        return ret;
    } catch (err) {
        console.error("Tasks not selected properly", err);
        return {};
    }
}
async function taskByStatus(status: string) {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        const ret: any = client.query(
            `SELECT * FROM orchestrator
            WHERE status = '${status}'
            ORDER BY id ASC;
            `).then(res => {
                return res.rows;
            }).catch(err => console.log("Query Error" + err));
        return ret;
    } catch (err) {
        console.error("Tasks not selected properly", err);
        return {};
    }
}
async function taskByID(taskID: number) {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        const ret: any = client.query(
            `SELECT * FROM orchestrator
            where id = '${taskID.toString()}';
            `).then(res => {
                return res.rows;
            }).catch(err => console.log("Query Error" + err));
        return ret;
    } catch (err) {
        console.error("Tasks not selected properly", err);
        return {};
    }
}

export { allTasks, taskByStatus, taskByID };