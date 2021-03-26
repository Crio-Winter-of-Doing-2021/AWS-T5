import { Client } from "pg";
import { connectionstring } from "./connectDB";

async function latestTask(): Promise<any[] | never[]> {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        const ret = client.query(
            `SELECT * FROM scheduler
            WHERE status = 'Scheduled'
            ORDER BY invoke_time ASC
            LIMIT 1;
            `).then(res => {
                return res.rows;
            }).catch(err => {
                console.log("Query Error" + err);
                return [];
            });
        return ret;
    } catch (err) {
        console.error("Tasks not selected properly", err);
        return [];
    }
}

export { latestTask };