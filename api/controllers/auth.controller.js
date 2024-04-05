import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
	const { username, email, password } = req.body

	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
				username
			}
		})

		if (user) {
			return res.status(400).json({
				message: 'User already exists'
			})
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const newUser = await prisma.user.create({
			data: {
				email,
				username,
				password: hashedPassword
			}
		})

		const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
			expiresIn: '15d'
		})

		res.cookie('auth_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 1296000000
		})

		res.status(201).json({ message: 'User  registered Ok' })
	} catch (error) {
		console.log('🚀 ~ register ~ error:', error)
		res.status(500).json({ message: 'Server Error' })
	}
}

export const login = async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await prisma.user.findUnique({
			where: { email }
		})

		if (!user) {
			return res.status(401).json({
				message: 'Invalid credentials'
			})
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(401).json({
				message: 'Invalid credentials'
			})
		}

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
			expiresIn: process.env.MAX_AGE
		})

		const { password: userPassword, ...userInfo } = user

		res
			.cookie('auth_token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: parseInt(process.env.MAX_AGE)
			})
			.status(200)
			.json({ ...userInfo })
	} catch (error) {
		console.log('🚀 ~ login ~ error:', error)
		res.status(500).json({
			message: 'Server Error'
		})
	}
}

export function logout(req, res) {
	// res.cookie('auth_token', '', {
	// 	expires: new Date(0)
	// })
	// res.json({ message: 'Good By, Come Back!!!' })

	res.clearCookie('auth_token').status(200).json({ message: 'Good By, Come Back!!!' })
}

export const verifyTokens = (req, res) => {
	res.status(200).send({ userId: req.userId })
}
