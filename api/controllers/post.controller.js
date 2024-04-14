import prisma from '../lib/prisma.js'
import jwt from 'jsonwebtoken'

export const getPosts = async (req, res) => {
	const query = req.query
	try {
		const posts = await prisma.post.findMany({
			where: {
				city: query.city || undefined,
				type: query.type || undefined,
				property: query.property || undefined,
				bedroom: parseInt(query.bedroom) || undefined,
				price: {
					gte: parseInt(query.minPrice) || 0,
					lte: parseInt(query.maxPrice) || 10000000
				}
			}
		})

		res.status(200).json(posts)
	} catch (error) {
		console.log('🚀 ~ getPosts ~ error:', error)
		res.status(500).json({
			message: 'Server Error'
		})
	}
}

export const getPost = async (req, res) => {
	const id = req.params.id

	try {
		const post = await prisma.post.findUnique({
			where: { id },
			include: {
				postDetail: true,
				user: {
					select: {
						email: true,
						username: true,
						avatar: true
					}
				},
				savedPost: true
			}
		})

		if (!post)
			return res.status(404).json({
				message: 'Post not found'
			})

		const token = req.cookies?.['auth_token']

		if (token) {
			jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
				if (err) {
					// Отправляем ответ с ошибкой, если не удалось верифицировать токен
					return res.status(401).json({ message: 'Unauthorized' })
				}
				try {
					const saved = await prisma.savedPost.findUnique({
						where: {
							userId_postId: {
								postId: id,
								userId: payload.userId
							}
						}
					})
					console.log('🚀 ~ post controller ~  saved :', saved ? true : false)
					// Отправляем ответ только один раз
					return res.status(200).json({ ...post, isSaved: saved ? true : false })
				} catch (error) {
					// Обрабатываем ошибку запроса к базе данных
					console.error('Database query error:', error)
					return res.status(500).json({ message: 'Server Error' })
				}
			})
		} else {
			// Отправляем ответ, если токен не предоставлен
			res.status(401).json({ message: 'No token provided' })
		}
	} catch (error) {
		console.log('🚀 ~ getPost ~ error:', error)
		res.status(500).json({
			message: 'Server Error'
		})
	}
}

export const addPost = async (req, res) => {
	const body = req.body
	const tokenUserId = req.userId

	try {
		const newPost = await prisma.post.create({
			data: {
				...body.postData,
				userId: tokenUserId,
				postDetail: {
					create: body.postDetail
				}
			}
		})
		res.status(200).json(newPost)
	} catch (error) {
		console.log('🚀 ~ addPost ~ error:', error)
		res.status(500).json({
			message: 'Server Error'
		})
	}
}

export const updatePost = async (req, res) => {
	try {
		res.status(200).json()
	} catch (error) {
		console.log('🚀 ~ updatePost ~ error:', error)
		res.status(500).json({
			message: 'Server Error'
		})
	}
}

export const deletePost = async (req, res) => {
	const tokenUserId = req.userId
	const id = req.params.id

	try {
		const post = await prisma.post.findUnique({
			where: { id }
		})

		if (!post)
			return res.status(404).json({
				message: 'Post not found'
			})

		if (tokenUserId !== post.userId)
			return res.status(403).json({
				message: 'Not Authorized'
			})

		await prisma.post.delete({
			where: {
				id: post.id
			}
		})

		res.status(200).json({
			message: 'Post delete'
		})
	} catch (error) {
		console.log('🚀 ~ deletePost ~ error:', error)
		res.status(500).json({
			message: 'Server Error'
		})
	}
}
