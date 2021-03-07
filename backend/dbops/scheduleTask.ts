import { Client } from "pg";
import { connectionstring } from "./connectDB";

async function scheduleTask(triggerURL: string, invoke_time: string, accessKeyID: string = "", secretAccessKey: string ="") {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        let ret: any = client.query(
            `INSERT INTO scheduler(url, status, invoke_time, accessKeyID, secretAccessKey) 
            VALUES('${triggerURL}', 'Scheduled', '${invoke_time}', '${accessKeyID}', '${secretAccessKey}')
            RETURNING id;
            `).then(res => {
                return res.rows[0];
            }).catch(err => console.log("Query Error" + err));
        return ret;
    } catch (err) {
        console.error("Task not scheduled properly", err);
    }
}

export { scheduleTask };