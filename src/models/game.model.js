import { getDb } from "../db"

class Game {
    constructor({winner_id, loser_id, winner_points, loser_points}) {
        this.winner_id = winner_id
        this.loser_id = loser_id
        this.winner_points = Number(winner_points)
        this.loser_points = Number(loser_points)
    }
}

Game.getGames = async () => {
    let query = `SELECT * FROM games`;
    const result = await getDb().query(query);
    return result.rows
}

Game.createGame = async (game) => {
    const gameToAdd = new Game(game)
    //TODO: Validate schema
    const result = await getDb().query('INSERT INTO games (winner_id, loser_id, winner_points, loser_points) VALUES ($1, $2, $3, $4)', [gameToAdd.winner_id, gameToAdd.loser_id, gameToAdd.winner_points, gameToAdd.loser_points])
    return result?.rows[0]
}

export default Game