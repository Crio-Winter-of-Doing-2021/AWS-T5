import { Client } from "pg";
import { connectionstring } from "./connectDB";

async function scheduleTask(triggerURLOrARN: string,  invoke_time: string,name : string, accessKeyID = "", secretAccessKey = "", payload = "") {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        const ret = client.query(
            `INSERT INTO scheduler(URLorARN, status, invoke_time, name, accessKeyID, secretAccessKey, payload) 
            VALUES('${triggerURLOrARN}', 'Scheduled', '${invoke_time}','${name}', '${accessKeyID}', '${secretAccessKey}', '${payload}')
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