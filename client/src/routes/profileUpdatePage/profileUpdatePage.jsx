import { useContext, useState } from 'react'
import './profileUpdatePage.scss'
import { AuthContext } from '../../context/AuthContext'
import apiRequest from '../../lib/apiRequest'
import { useNavigate } from 'react-router-dom'

function ProfileUpdatePage() {
	const { currentUser, updateUser } = useContext(AuthContext)
	const navigate = useNavigate()

	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handelSubmit = async e => {
		e.preventDefault()
		setIsLoading(true)
		setError('')

		const formData = new FormData(e.target)
		const { email, username, password } = Object.fromEntries(formData)

		try {
			const res = await apiRequest.put(`/user/${currentUser.id}`, {
				email,
				username,
				password
			})

			updateUser(res.data)
			navigate('/profile')

			console.log(res.data)
		} catch (err) {
			console.log(err)
			setError(err.response.data.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="profileUpdatePage">
			<div className="formContainer">
				<form onSubmit={handelSubmit}>
					<h1>Update Profile</h1>
					<div className="item">
						<label htmlFor="username">Username</label>
						<input id="username" name="username" type="text" defaultValue={currentUser.username} />
					</div>
					<div className="item">
						<label htmlFor="email">Email</label>
						<input id="email" name="email" type="email" defaultValue={currentUser.email} />
					</div>
					<div className="item">
						<label htmlFor="password">Password</label>
						<input id="password" name="password" type="password" />
					</div>
					<button disabled={isLoading}>Update</button>
					{error && <p>{error}</p>}
				</form>
			</div>
			<div className="sideContainer">
				<img src={currentUser.avatar || '/noavatar.jpg'} alt="" className="avatar" />
			</div>
		</div>
	)
}

export default ProfileUpdatePage
