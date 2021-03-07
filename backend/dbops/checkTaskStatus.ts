import { Client } from "pg";
import { connectionstring } from "./connectDB";

async function checkTaskStatus(taskID: string) {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        let ret: any = client.query(
            `SELECT status FROM scheduler
            WHERE id = '${taskID}';
            `).then(res => {
                return res.rows[0];
            }).catch(err => console.log("Query Error" + err));
        return ret;
    } catch (err) {
        console.error("Task ID not taken up properly", err);
    }
}

export { checkTaskStatus };