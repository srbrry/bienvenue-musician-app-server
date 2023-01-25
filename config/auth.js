// Require the needed npm packages
const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || 'is your server running? well then you better go catch it'

const { Strategy, ExtractJwt } = require('passport-jwt')

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
}

// Require the user model
const User = require('../models/user')

const strategy = new Strategy(opts, function (jwt_payload, done) {
	// Using Mongoose's `.findOneById()` method, we find the user in our database
	User.findById(jwt_payload.id)
		.then((user) => done(null, user))
		.catch((err) => done(err))
})

passport.use(strategy)

// Initialize the passport middleware based on the above configuration!!!!!!! the code won't be usable UNLESS you initialize and invoke
passport.initialize()

const requireToken = passport.authenticate('jwt', { session: false })

// Create a function that takes the request and a user document
// and uses them to create a token to send back to the user
const createUserToken = (req, user) => {
	// Make sure that we have a user, if it's null that means we didn't
	// find the email in the database.  If there is a user, make sure
	// that the password is correct.  For security reason, we don't want
	// to tell the client whether the email was not found or that the
	// password was incorrect.  Instead we send the same message for both
	// making it much harder for hackers.
	if (
		!user ||
		!req.body.credentials.password ||
		!bcrypt.compareSync(req.body.credentials.password, user.password)
	) {
		const err = new Error('The provided username or password is incorrect')
		err.statusCode = 422
		throw err
	}
	// If no error was thrown, we create the token from user's id and
	// return the token
	return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 })
}

module.exports = {
	requireToken,
	createUserToken,
}
