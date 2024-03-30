import express from 'express'

const router = express.Router()

router.post('/login', (req, res) => {
	try {
		res.status(200).json({
			message: 'Login Router'
		})
	} catch (error) {
		console.log('🚀 ~ router.post ~ error:', error)
		res.status(500).json({
			message: 'Server Error'
		})
	}
})

router.post('/register', (req, res) => {
	try {
		res.status(200).json({
			message: 'Register Router'
		})
	} catch (error) {
		console.log('🚀 ~ router.post ~ error:', error)
		res.status(500).json({
			message: 'Server Error'
		})
	}
})

router.post('/logout', (req, res) => {
	try {
		res.status(200).json({
			message: 'Logout Router'
		})
	} catch (error) {
		console.log('🚀 ~ router.post ~ error:', error)
		res.status(500).json({
			message: 'Server Error'
		})
	}
})

export default router
