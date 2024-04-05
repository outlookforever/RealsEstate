import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import apiRequest from '../../lib/apiRequest'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function Login() {
	const { updateUser } = useContext(AuthContext)
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const handelSubmit = async e => {
		e.preventDefault()
		setIsLoading(true)
		setError('')

		const formData = new FormData(e.target)

		// FIXME: Must Have
		// const {email, password} = Object.fromEntries(formData)
		// OR
		const email = formData.get('email')
		const password = formData.get('password')

		try {
			const res = await apiRequest.post('/auth/login', {
				email,
				password
			})

			updateUser(res.data)

			navigate('/')
		} catch (err) {
			console.log(err)
			setError(err.response.data.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="login">
			<div className="formContainer">
				<form onSubmit={handelSubmit}>
					<h1>Welcome back</h1>
					<input name="email" required minLength={6} type="email" placeholder="Email" />
					<input name="password" required minLength={6} type="password" placeholder="Password" />
					<button disabled={isLoading}>Login</button>
					{error && <span>{error}</span>}
					<Link to="/register">{"Don't"} you have an account?</Link>
				</form>
			</div>
			<div className="imgContainer">
				<img
					src="/bg.p
        ng"
					alt=""
				/>
			</div>
		</div>
	)
}

export default Login
