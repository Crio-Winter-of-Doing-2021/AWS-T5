import { Client } from "pg";
import { connectionstring } from "./connectDB";
import { backupDB } from "./backupDB";

async function dbInit() : Promise<void> {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        const res: any = client.query(
            `CREATE TABLE IF NOT EXISTS orchestrator(
                id SERIAL PRIMARY KEY,
                orchestratorList VARCHAR(16384) NOT NULL,
                name varchar(512) default '',
                status varchar(32) default 'Scheduled',
                invoke_time TIMESTAMP DEFAULT NOW(), 
                payload varchar(16384) DEFAULT ''
                );
            `,(err,res) => {
                if(res)
                {
                    backupDB();
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
export { dbInit };