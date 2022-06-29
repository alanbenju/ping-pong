import express from 'express'
import gamesController from '../controllers/game.controller'
import { isLoggedIn } from '../middlewares/isLoggedIn'

const gamesRoutes = express.Router()

gamesRoutes.get('/', isLoggedIn ,gamesController.find)
gamesRoutes.post('/', isLoggedIn, gamesController.create)

export default gamesRoutes
