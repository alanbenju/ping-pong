import { Pool } from "pg";

let pool;

export function getDb(){
  return pool
}

export async function connectToDB() {
  if (process.env.NODE_ENV == "test"){
    pool = new Pool({
      user: process.env.DB_TEST_USER,
      host: process.env.DB_TEST_HOST,
      database: process.env.DB_TEST_DATABASE,
      password: process.env.DB_TEST_PASS,
      port: process.env.DB_TEST_PORT,
    })
  }
  else{
    pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
    })
  
  }

}