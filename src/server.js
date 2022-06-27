
import express, { json } from 'express'
import bodyParser from 'body-parser'
//import attendeesRoutes from './routes/attendees.route'
//import presentationRoutes from './routes/presentations.route'
import 'dotenv/config'
import { connectToDB } from './db'
import usersRoutes from './routes/users.route'
import gamesRoutes from './routes/game.route'
import adminRoutes from './routes/admins.route'
const app = express()

app.use(json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

connectToDB()

app.use('/games', gamesRoutes)
app.use('/users', usersRoutes)
app.use('/admin', adminRoutes)

app.use('/', (req, res) => res.send(200))

export default app
