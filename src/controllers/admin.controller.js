import adminService from "../services/admin.service"

class AdminController {
  constructor() { }

  async signup(req, res) {
    try {
      const result = await adminService.signup(req.body)
      const response = {
        result
      }
      res.status(201).send(response)
    } catch (err) {
      const response = {
        err: err.toString()
      }
      res.status(500).send(response) // TODO: Code depends on custom error
    }
  }

  async login(req, res) {
    try {
      const result = await adminService.login(req.body)
      const response = {
        result
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

const adminController = new AdminController()
export default adminController