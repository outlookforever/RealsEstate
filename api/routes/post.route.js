import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
	console.log('routerPost get all')
	res.status(200).json({
		message: 'well good'
	})
})

router.get('/:id', (req, res) => {
	console.log('routerPost getById', req.params.id)
	res.status(200).json({
		message: 'well good'
	})
})

router.post('/', (req, res) => {
	console.log('routerPost post')
	res.status(200).json({
		message: 'well good'
	})
})

router.put('/:id', (req, res) => {
	console.log('routerPost update', req.params.id)
	res.status(200).json({
		message: 'well good'
	})
})

router.delete('/:id', (req, res) => {
	console.log('routerPost delete', req.params.id)
	res.status(200).json({
		message: 'well good'
	})
})

export default router
