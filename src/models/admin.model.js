import { pool } from "../db"
import authService from "../services/auth.service"

class Admin {
    constructor({ username, password }) {
        this.username = username
        this.password = password
    }
}

Admin.getAdmins = async () => {
    let query = `SELECT * FROM admins`;
    const result = await pool.query(query);
    return result.rows
}

Admin.createAdmin = async (user) => {
    const userToAdd = new Admin(user)
    const pass = await authService.encryptPassword(userToAdd.password)
    //TODO: Validate admin schema
    const result = await pool.query('INSERT INTO admins (username, password) VALUES ($1, $2) RETURNING *', [userToAdd.username, pass])
    return result?.rows[0]
}

Admin.findOneByUsername = async (username) => {
    const result = await pool.query(`SELECT * FROM admins where username = $1`, [username]);
    return result.rows[0]
}

export default Admin