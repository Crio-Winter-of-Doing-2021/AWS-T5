import { Client } from "pg";
import { connectionstring } from "./connectDB";

async function allTasks() {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        const ret: any = client.query(
            `SELECT * FROM scheduler
            ORDER BY id ASC;
            `).then(res => {
                return res.rows;
            }).catch(err => console.log("Query Error" + err));
        return ret;
    } catch (err) {
        console.error("Tasks not selected properly", err);
    }
}

export { allTasks };