import { Pool , Client } from 'pg';

// ensure PostgresQL System Service has been started
const pool: Pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'postgres',
    password : 'postgres',
    port : 5432,
    max : 50
});

const connectionstring = "postgresql://postgres:postgres@localhost:5432/postgres";

export {pool, connectionstring}