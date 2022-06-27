import { pool } from "../db"
import authService from "../services/auth.service"

class User {
    constructor({ username }) {
        this.username = username
        this.wins = 0
        this.losses = 0
    }
}

User.getUsers = async () => {
    let query = `SELECT * FROM users`;
    const result = await pool.query(query);
    return result.rows
}

User.createUser = async (user) => {
    const userToAdd = new User(user)
    //TODO: Validate user schema
    const result = await pool.query('INSERT INTO users (username, wins, losses) VALUES ($1, $2, $3, $4)', [userToAdd.username, userToAdd.wins, userToAdd.losses])
    return result?.rows
}

User.wonGame = async (id, wins) => {
    const result = await pool.query('UPDATE users SET wins = $2 where id = $1', [id, wins + 1])
    return result?.rows[0]
}

User.lostGame = async (id, losses) => {
    const result = await pool.query('UPDATE users SET losses = $2 where id = $1', [id, losses + 1])
    return result?.rows[0]
}

User.findOneById = async (id) => {
    const result = await pool.query(`SELECT * FROM users where id = $1`, [id]);
    return result.rows[0]
}

User.getRank = async () => {
    const query = `SELECT id, username, wins, losses, wins + losses as total, wins * 100/ cast(wins + losses as float) as percentageOfWins
    from public.users 
    where wins > 0 or losses > 0
    order by percentageOfWins desc, total desc`
    const result = await pool.query(query);
    return result.rows
}

export default User