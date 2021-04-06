import {Pool , Client} from 'pg';

const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'postgres',
    password : 'postgres',
    port : 5432
})

const connectionString = "postgresql://postgres:postgres@localhost:5432/postgres";

async function initTable() {
    const client = new Client(connectionString);
    await client.connect();
    await client.query(
        `CREATE TABLE IF NOT EXISTS userdb(
            id VARCHAR(200) NOT NULL,
            email VARCHAR(200) NOT NULL
        );`
    ,(err,res) => {
        if(res) {
            console.log('User DB Started');
        }
        else {
            console.log("User DB Error : "+ err);
        }
    })
}

export {initTable};