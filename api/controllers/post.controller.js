import prisma from '../lib/prisma.js'

export const getPosts = async (req, res) => {
	try {
		const posts = await prisma.post.findMany()

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
				}
			}
		})

		if (!post)
			return res.status(404).json({
				message: 'Post not found'
			})

		res.status(200).json(post)
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
				id
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
