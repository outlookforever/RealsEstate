import express from 'express'
import { login, logout, register, verifyTokens } from '../controllers/auth.controller.js'
import verifyToken from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/login', login)

router.post('/register', register)

router.post('/logout', logout)

router.get('/validation-token', verifyToken, verifyTokens)

export default router
