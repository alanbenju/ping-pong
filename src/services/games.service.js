import Game from "../models/game.model"
import usersService from "./users.service"

class GamesService {
  async get() { 
    try{
      const result = await Game.getGames()
      return result
    }
    catch(err){
      console.log('Error getting games', err)
      throw new Error('Error while getting games') // TODO: Throw custom error

    }
  }

  async create (game) {
    try {
      const winnerId = game.winnerId
      const loserId = game.loserId
      await usersService.setGame(winnerId, loserId);

      await Game.createGame(game)
    } catch (err) {
      console.log('Error while creating game', err)
      throw new Error('Error while creating game') // TODO: Throw custom error
    }
  }
}

const gamesService = new GamesService()
export default gamesService
