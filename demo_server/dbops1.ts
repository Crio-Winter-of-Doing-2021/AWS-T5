import {Pool , Client} from 'pg';

const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'postgres',
    password : 'postgres',
    port : 5432
})

const connectionString = "postgresql://postgres:postgres@localhost:5432/postgres";

async function initTable1() {
    const client = new Client(connectionString);
    await client.connect();
    await client.query(
        `CREATE TABLE IF NOT EXISTS userdb1(
            id VARCHAR(200) NOT NULL,
            userid VARCHAR(600) NOT NULL
        );`
    ,(err,res) => {
        if(res) {
            console.log('User DB 1 Started');
        }
        else {
            console.log("User DB 1 Error : "+ err);
        }
    })
}

async function insertdata1(id : string , userid : string) {
    const client = new Client(connectionString);
    try {
        await client.connect();

        await client.query(
            `INSERT INTO userdb1(id,userid) 
            VALUES ('${id}','${userid}');`
        )
        return true;
    }
    catch(err) {
        console.log("User DB 1 Error : " + err);
        return false;
    }
    finally {
        client.end();
    }
}

async function retrievedata1(userid :string)  {
    const client = new Client(connectionString);
    try {
        await client.connect();
        let res = await client.query(
            `SELECT id FROM userdb1 WHERE userid='${userid}';`
        )
        return res.rows;
    }
    catch(err) {
        console.log("User DB 1 Error : " + err);
        return [];
    }
    finally {
        client.end();
    }
}


export {initTable1,insertdata1,retrievedata1};