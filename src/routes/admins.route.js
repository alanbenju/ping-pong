import express from 'express'
import adminController from '../controllers/admin.controller'

const adminRoutes = express.Router()

adminRoutes.post('/login', adminController.login)
adminRoutes.post('/signup', adminController.signup)

export default adminRoutes
