import express from 'express'
import verifyToken from '../middleware/auth.middleware.js'
import { deleteUser, getUser, getUsers, updateUser, savedPost, profilePost } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/', getUsers)
// router.get('/:id', verifyToken, getUser)
router.put('/:id', verifyToken, updateUser)
router.delete('/:id', verifyToken, deleteUser)
router.delete('/:id', verifyToken, deleteUser)
router.post('/saved', verifyToken, savedPost)
router.get('/profilePost', verifyToken, profilePost)

export default router
