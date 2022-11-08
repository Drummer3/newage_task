const { getBlacklistToken } = require("../utils/database");

const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "V*i4AECQA^*zjN";

function privateRouteMiddleware(req, res, next) {
	const header_token = req.headers.authorization?.split("Bearer ")[1];

	const blacklist = getBlacklistToken();
	if (blacklist.includes(req.headers.authorization))
		return (
			res.status(401),
			res.json({ error: "Your authorization token is invalid" })
		);

	try {
		jwt.verify(header_token, JWT_SECRET_KEY);
	} catch (e) {
		if (e instanceof jwt.TokenExpiredError)
			return (
				res.status(401), res.json({ error: "Authorization token is expired" })
			);
		return (
			res.status(401),
			res.json({ error: "We had trouble verifying your authorization token" })
		);
	}
	next();
}

function ownerMiddlerware(req, res, next) {
	const token = req.headers.authorization.split("Bearer ")[1];
	const user = jwt.decode(token);
	if (user.uuid !== req.params.userid)
		return (
			res.status(403),
			res.json({ error: "You aren't authorized to modify this record" })
		);
	next();
}

module.exports = { privateRouteMiddleware, ownerMiddlerware };
