import * as databaseConfig from '../src/db'
import { Pool } from 'pg';

const createTestDatabase = async () => {

    const db = new Pool({
        user: process.env.DB_TEST_USER,
        host: process.env.DB_TEST_HOST,
        database: process.env.DB_TEST_DATABASE,
        password: process.env.DB_TEST_PASS,
        port: process.env.DB_TEST_PORT,
    })

    jest.spyOn(databaseConfig, 'getDb').mockReturnValue(db)

    await db.query(`CREATE TABLE IF NOT EXISTS users
    (
        id SERIAL,
        username varchar,
        wins integer,
        losses integer,
        CONSTRAINT users_pkey PRIMARY KEY (id),
        CONSTRAINT users_username_key UNIQUE (username)
    )`);
    await db.query('DELETE FROM users');
    await db.query(`CREATE TABLE IF NOT EXISTS games
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
    await db.query('DELETE FROM games');
    await db.query(`CREATE TABLE IF NOT EXISTS admins
    (
        id SERIAL,
        username varchar NOT NULL,
        password varchar NOT NULL
    )`);
    await db.query('DELETE FROM admins');
    return {
        closeConnection: async () => {
            await db.end()
        },
        cleanDB: async () => {
            await db.query('TRUNCATE ONLY users RESTART IDENTITY CASCADE;');
            await db.query('TRUNCATE ONLY users RESTART IDENTITY CASCADE;');
            await db.query('TRUNCATE ONLY users RESTART IDENTITY CASCADE;');
        }
    }
}


export default createTestDatabase