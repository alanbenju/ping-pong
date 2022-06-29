import User from "../models/user.model"

class UsersService {
  async get() {
    return await User.getUsers();
  }

  async getRank() {
    return await User.getRank();
  }

  async create(user) {
    try {
      return await User.createUser(user)
    } catch (err) {
      console.log('Error while creating user', err)
      throw new Error('Error while creating user') // TODO: Throw custom error
    }
  }

  async setGame(winner_id, loser_id) {
    try {
      const winner = await User.findOneById(winner_id)
      const loser = await User.findOneById(loser_id)
      if (winner && loser) {
        await User.wonGame(winner_id, winner.wins)
        await User.lostGame(loser_id, loser.losses)
      }
      else throw new Error("Not all users exist")
    }
    catch (err) {
      throw err
    }
  }
}

const usersService = new UsersService()
export default usersService
