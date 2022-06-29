import gamesService from "../services/games.service"
import usersService from "../services/users.service"

class GamesController {
  constructor(){}

  async find(req, res){
    const games = await gamesService.get()
    const response = {
      result: games,
    }
    res.send(response)
  }

  async create (req, res) {
    try {
      const game = req.body
      await usersService.setGame(game.winner_id, game.loser_id)
      const createdGame = await gamesService.create(game);
      const response = {
        result: createdGame
      }
      res.status(201).send(response)
    } catch (err) {
      const response = {
        err: err.toString()
      }
      res.status(500).send(response) // TODO: Code depends on custom error
    }
  }
}

const gamesController = new GamesController()
export default gamesController