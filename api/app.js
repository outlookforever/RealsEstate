import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

import postRoutes from './routes/post.route.js'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'

// import testRoutes from './routes/test.route.js'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true
	})
)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/posts', postRoutes)

// Routing Lock
// app.use('/api/test', testRoutes)

app.listen(8800, () => {
	console.log('Server is running!')
})
