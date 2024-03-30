import express from 'express'

const router = express.Router()

router.get('/:id', (req, res) => {
	console.log('user get', req.params.id)
	res.status(200).json({
		message: 'well good'
	})
})

router.put('/:id', (req, res) => {
	console.log('user update', req.params.id)
	res.status(200).json({
		message: 'well good'
	})
})

export default router
