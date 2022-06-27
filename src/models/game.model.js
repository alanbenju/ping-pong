import { pool } from "../db"

class Game {
    constructor({winnerId, loserId, winnerPoints, loserPoints}) {
        this.winnerId = winnerId
        this.loserId = loserId
        this.winnerPoints = Number(winnerPoints)
        this.loserPoints = Number(loserPoints)
    }
}

Game.getGames = async () => {
    let query = `SELECT * FROM games`;
    const result = await pool.query(query);
    return result.rows
}

Game.createGame = async (game) => {
    const gameToAdd = new Game(game)
    //TODO: Validate schema
    const result = await pool.query('INSERT INTO games (winnerId, loserId, winnerPoints, loserPoints) VALUES ($1, $2, $3, $4)', [gameToAdd.winnerId, gameToAdd.loserId, gameToAdd.winnerPoints, gameToAdd.loserPoints])
    return result?.rows[0]
}

export default Game