import express from 'express'
import gamesController from '../controllers/game.controller'

const gamesRoutes = express.Router()

gamesRoutes.get('/', gamesController.find)
gamesRoutes.post('/', gamesController.create)

export default gamesRoutes
