import express from 'express'
import usersController from '../controllers/users.controller'
import isLoggedIn from '../middlewares/isLoggedIn.middleware'

const usersRoutes = express.Router()

usersRoutes.get('/', isLoggedIn, usersController.find)
usersRoutes.get('/rank', isLoggedIn, usersController.getRank)
usersRoutes.post('/', isLoggedIn, usersController.create)

export default usersRoutes
