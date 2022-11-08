const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "V*i4AECQA^*zjN";

function privateRouteMiddleware(req, res, next) {
	const header_token = req.headers.authorization?.split("Bearer ")[1];
	try {
		jwt.verify(header_token, JWT_SECRET_KEY);
	} catch (e) {
		if (e instanceof jwt.TokenExpiredError)
			return (
				res.status(401),
				res.json({ error: "Authorization token is expired" })
			);
		return (
			res.status(401),
			res.json({ error: "We had trouble verifying your authorization token" })
		);
	}
	next();
}

module.exports = { privateRouteMiddleware };
