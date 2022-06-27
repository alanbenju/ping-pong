import express from 'express'
import usersController from '../controllers/users.controller'

const usersRoutes = express.Router()

usersRoutes.get('/', usersController.find)
usersRoutes.get('/rank', usersController.getRank)
usersRoutes.post('/', usersController.create)

export default usersRoutes
