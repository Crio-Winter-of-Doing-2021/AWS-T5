import { Client } from "pg";
import { connectionstring } from "./connectDB";

async function dbInit() {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        const res: any = client.query(
            `CREATE TABLE IF NOT EXISTS scheduler(
                id SERIAL PRIMARY KEY,
                URLorARN VARCHAR(2048) NOT NULL,
                status VARCHAR(128) NOT NULL,
                accessKeyID VARCHAR(128) NOT NULL,
                secretAccessKey VARCHAR(2048) NOT NULL,
                invoke_time TIMESTAMP DEFAULT NOW()
                );
            `,(err,res) => {
                if(res)
                {
                    console.log('Table Initialized !!');
                }
                else {
                    console.error('Query Error : ' + err);
                }
            }
        )
    } catch {
        console.error("Table not initialized properly");
    }
}
dbInit();
export { dbInit };