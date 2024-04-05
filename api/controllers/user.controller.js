import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {
	try {
		const users = await prisma.user.findMany()

		res.status(200).json({ users })
	} catch (error) {
		console.log('🚀 ~ getUsers ~ error:', error)
		res.status(500).json({
			message: 'Server Error'
		})
	}
}

export const getUser = async (req, res) => {
	const id = req.params.id

	try {
		const user = await prisma.user.findUnique({
			where: { id }
		})
		if (!user) return res.status(404).json({ message: 'User not found' })
		res.status(200).json(user)
	} catch (error) {
		console.log('🚀 ~ getUser ~ error:', error)
		res.status(500).json({
			message: 'Server Error'
		})
	}
}

export const updateUser = async (req, res) => {
	const id = req.params.id
	const tokenUserId = req.userId
	const { password, avatar, ...inputs } = req.body

	if (id !== tokenUserId)
		return res.status(403).json({
			message: 'Not Authorized'
		})

	let updatePassword = null

	try {
		if (password) {
			updatePassword = await bcrypt.hash(password, 10)
		}

		const updateUser = await prisma.user.update({
			where: {
				id
			},
			data: {
				...inputs,
				...(updatePassword && { password: updatePassword }),
				...(avatar && { avatar })
			}
		})

		const { password: userPassword, ...userInfo } = updateUser

		res.status(200).json(userInfo)
	} catch (error) {
		console.log('🚀 ~ updateUser ~ error:', error)
		res.status(500).json({
			message: 'Server Error'
		})
	}
}

export const deleteUser = async (req, res) => {
	const id = req.params.id
	const tokenUserId = req.userId

	if (id !== tokenUserId)
		return res.status(403).json({
			message: 'Not Authorized'
		})

	try {
		await prisma.user.delete({ where: { id } })

		res.status(200).json({
			message: 'User has been delete'
		})
	} catch (error) {
		console.log('🚀 ~ deleteUser ~ error:', error)
		res.status(500).json({
			message: 'Server Error'
		})
	}
}
