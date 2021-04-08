import { connectionstring } from "./connectDB"
import { backupDB } from "./backupDB"
import { Client } from "pg";

async function setInvoke(orchestratorList: string, name: string, delay: number, payload: string): Promise<number> {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        const curr_Date: Date = new Date();
        const timezoneDiff: number = 1000 * 60 * (curr_Date.getTimezoneOffset());
        curr_Date.setMilliseconds(curr_Date.getMilliseconds() + delay - timezoneDiff);
        const invoke_time: string = curr_Date.toISOString();
        const ret = client.query(
            `INSERT INTO orchestrator(orchestratorList, name, status, invoke_time, payload) 
            VALUES('${orchestratorList}', '${name}', 'Scheduled', '${invoke_time}', '${payload}')
            RETURNING id;
            `).then(res => {
                return res.rows[0].id;
            }).catch(err => console.log("Query Error" + err));
        backupDB();
        return ret;
    } catch (err) {
        console.error("Task not scheduled properly", err);
        return -1;
    }
}

export {setInvoke}