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

  async setGame(winnerId, loserId) {
    try {
      const winner = await User.findOneById(winnerId)
      const loser = await User.findOneById(loserId)
      if (winner && loser) {
        await User.wonGame(winnerId, winner.wins)
        await User.lostGame(loserId, loser.losses)
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
