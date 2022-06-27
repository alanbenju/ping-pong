import Admin from "../models/admin.model";
import authService from "./auth.service";

class AdminService {
  async get() {
    return await Admin.getAdmins();
  }

  async signup(admin) {
    try {
      const adminToCreate = new Admin(admin)
      const createdAdmin = await Admin.createAdmin(adminToCreate)
      return authService.buildToken(createdAdmin)
      // login and return jwt
    } catch (err) {
      console.log('Error while creating admin', err)
      throw new Error('Error while creating admin') // TODO: Throw custom error
    }
  }

  async login({username, password}) {
    try {
      const admin = await Admin.findOneByUsername(username)
      if (admin) {
        const match = await authService.validatePass(admin.password, password)
        if (match) return authService.buildToken(admin)
        else throw new Error("Wrong password")
      }
      else throw new Error("There is no admin with that username")
    }
    catch (err) {
      throw err
    }
  }
}

const adminService = new AdminService()
export default adminService
