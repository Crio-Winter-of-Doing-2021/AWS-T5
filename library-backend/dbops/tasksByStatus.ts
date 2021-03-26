import { Client } from "pg";
import { connectionstring } from "@dbops/connectDB";

async function tasksByStatus(statusToCheck: string) {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        const ret = client.query(
            `SELECT * FROM scheduler
            WHERE status = '${statusToCheck}'
            ORDER BY invoke_time ASC;
            `).then(res => {
                return res.rows;
            }).catch(err => console.log("Query Error" + err));
        return ret;
    } catch (err) {
        console.error("Tasks not selected properly", err);
    }
}

export { tasksByStatus };