import { stringify } from 'node:querystring';
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
            userid VARCHAR(600) NOT NULL
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

async function insertdata(id : string , userid : string) {
    const client = new Client(connectionString);
    try {
        await client.connect();

        await client.query(
            `INSERT INTO userdb(id,userid) 
            VALUES ('${id}','${userid}');`
        )
        return true;
    }
    catch(err) {
        console.log("User DB Error : " + err);
        return false;
    }
    finally {
        client.end();
    }
}

async function retrievedata(userid :string)  {
    const client = new Client(connectionString);
    try {
        await client.connect();
        let res = await client.query(
            `SELECT id FROM userdb WHERE userid='${userid}';`
        )
        return res.rows;
    }
    catch(err) {
        console.log("User DB Error : " + err);
        return [];
    }
    finally {
        client.end();
    }
}


export {initTable,insertdata,retrievedata};