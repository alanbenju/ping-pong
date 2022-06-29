import { Pool } from "pg";

let pool;

export function getDb() {
  return pool
}

async function connectToDB() {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  })
}


async function createTables() {
  await pool.query(`CREATE TABLE IF NOT EXISTS users
    (
        id SERIAL,
        username varchar,
        wins integer,
        losses integer,
        CONSTRAINT users_pkey PRIMARY KEY (id),
        CONSTRAINT users_username_key UNIQUE (username)
    )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS games
    (
        id SERIAL,
        winner_id integer,
        loser_id integer,
        winner_points integer,
        loser_points integer,
        CONSTRAINT games_pkey PRIMARY KEY (id),
        CONSTRAINT games_loser_id_fkey FOREIGN KEY (loser_id)
            REFERENCES users (id) MATCH SIMPLE,
        CONSTRAINT games_winner_id_fkey FOREIGN KEY (winner_id)
            REFERENCES users (id) MATCH SIMPLE
    )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS admins
    (
        id SERIAL,
        username varchar NOT NULL,
        password varchar NOT NULL
    )`);
}

export async function startDB(){
  await connectToDB()
  await createTables()
}