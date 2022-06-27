import { Pool } from "pg";

export let pool;

export async function connectToDB() {
  pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'ping-pong',
    password: 'admin',
    port: 35000,
  })

}