import UsersService from '../services/users.service'

class UsersController {
  constructor(){}

  async find(req, res){
    const users = await UsersService.get()
    const response = {
      result: users,
    }
    res.send(response)
  }

  async create (req, res) {
    try {
      const user = await UsersService.create(req.body)
      const response = {
        result: user
      }
      res.status(201).send(response)
    } catch (err) {
      const response = {
        err: err.toString()
      }
      res.status(500).send(response) // TODO: Code depends on custom error
    }
  }

  async getRank(req, res){
    const users = await UsersService.getRank()
    const response = {
      result: users,
    }
    res.send(response)
  }
}

const usersController = new UsersController()
export default usersController


/*
  async create (req, res) {
    try {
      const attendee = await UsersService.create(req.body)
      const response = {
        result: attendee
      }
      res.status(201).send(response)
    } catch (err) {
      const response = {
        err: err.toString()
      }
      res.status(500).send(response) // TODO: Code depends on custom error
    }
  }*/