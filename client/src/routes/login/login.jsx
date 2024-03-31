import axios from 'axios'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handelSubmit = async e => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const email = formData.get('email')
		const password = formData.get('password')

		try {
			await axios.post('http://localhost:8800/api/auth/login', {
				email,
				password
			})

			navigate('/')
		} catch (err) {
			console.log(err)
			setError(err.response.data.message)
		}
	}

	return (
		<div className="login">
			<div className="formContainer">
				<form onSubmit={handelSubmit}>
					<h1>Welcome back</h1>
					<input name="email" type="email" placeholder="Email" />
					<input name="password" type="password" placeholder="Password" />
					<button>Login</button>
					{error && <span>{error}</span>}
					<Link to="/register">{"Don't"} you have an account?</Link>
				</form>
			</div>
			<div className="imgContainer">
				<img src="/bg.png" alt="" />
			</div>
		</div>
	)
}

export default Login
