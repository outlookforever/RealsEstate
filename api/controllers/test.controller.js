import jwt from 'jsonwebtoken'

export const shouldBeLoggedIn = async (req, res) => {
	const token = req.cookies['auth_token']
	if (!token) {
		return res.status(401).json({
			message: 'unauthorized'
		})
	}

	jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
		if (err)
			return res.status(403).json({
				message: 'unauthorized'
			})
	})

	res.status(200).json({
		message: 'Authorized'
	})
}

export const shouldBeAdmin = async (req, res) => {
	// paste in jwt isAdmin
	// wen you sign jwt in login or registration
	// jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
	// 	if (err)
	// 		return res.status(403).json({
	// 			message: 'unauthorized'
	// 		})
	//   if (payload.isAdmin)  return res.status(403).json({
	//     message: 'unauthorized'
	//   })
	// })
}
