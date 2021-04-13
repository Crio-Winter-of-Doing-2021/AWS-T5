import { Client } from "pg";
import { connectionstring } from "./connectDB";

async function tasksLessThanTime(endTime: number) : Promise<Array<{id: string, orchestratorlist: string, payload: string}>> {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect()
        const timezoneDiff: number = 1000 * 60 * (new Date().getTimezoneOffset());
        const endTimeISO: string = new Date(endTime - timezoneDiff).toISOString()
        console.log(endTimeISO)
        const ret = client.query(
            `select id, orchestratorList, payload from orchestrator 
            where invoke_time < '${endTimeISO}' 
            and status = 'Scheduled';
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

export { tasksLessThanTime }