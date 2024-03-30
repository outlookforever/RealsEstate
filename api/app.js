import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

const app = express()

// TODO: Take cookies from front - Application/Cookies; from back - (req.cookies in middleware/auth/ts)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// TODO: Cookies cors and in frontend fetch + credentials: original (watch api-client in front)!!!!!!!!
app.use(
	cors({
		// origin: process.env.FRONTEND_URL,
		credentials: true
	})
)

console.log('Tst')

app.listen(8800, () => {
	console.log('Server is running!')
})
