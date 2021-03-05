import { Pool , Client } from 'pg';

const pool: Pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'postgres',
    password : 'postgres',
    port : 5432,
    max : 50
});

const connectionstring: string = "postgresql://postgres:postgres@localhost:5432/postgres";

async function connectDB() {
    const client: Client = new Client(connectionstring);
    await client.connect();
    let res: any = client.query(
        `CREATE TABLE IF NOT EXISTS scheduler(
            id SERIAL PRIMARY KEY,
            url VARCHAR(2048) NOT NULL,
            status VARCHAR(100) NOT NULL,
            entry_time TIMESTAMP DEFAULT NOW(),
            delay INTEGER DEFAULT 0);
        `,(err,res) => {
            if(res)
            {
                console.log('Database Connected !!');
            }
            else {
                console.error('Error : ' + err);
            }
        }
    )
}
export default connectDB;