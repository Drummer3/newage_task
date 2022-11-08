const express = require("express");

const {
	readUserFromDatabaseWithIndex,
	updateDatabaseRecord,
	deleteUserFromDatabase,
	blacklistToken,
} = require("../utils/database");

const {
	privateRouteMiddleware,
	ownerMiddleware,
} = require("../middleware/privateRouteMiddleware");

const router = express.Router();

router.put(
	"/:userid",
	[privateRouteMiddleware, ownerMiddleware],
	(req, res) => {
		const userId = req.params.userid;
		const { firstName, lastName } = req.body;
		if (!firstName || !lastName)
			return (
				res.status(400),
				res.json({ err: "First name and last name are required fields" })
			);

		if (!/^[A-Za-z]+$/.test(firstName))
			return (
				res.status(400),
				res.json({
					error: "First name shouldn't only use latin characters",
				})
			);

		if (!/^[A-Za-z]+$/.test(lastName))
			return (
				res.status(400),
				res.json({
					error: "Last name shouldn't only use latin characters",
				})
			);

		const existingData = readUserFromDatabaseWithIndex(userId);
		if (!existingData)
			return (
				res.status(400),
				res.json({
					error: "We couldn't find user in the database",
				})
			);
		existingData.firstName = firstName;
		existingData.lastName = lastName;

		const user = updateDatabaseRecord(userId, existingData);

		return res.send({ user });
	}
);

router.delete(
	"/:userid",
	[privateRouteMiddleware, ownerMiddleware],
	(req, res) => {
		deleteUserFromDatabase(req.params.userid);
		const token = req.headers.authorization;
		blacklistToken(token);
		return res.send({message: "User has been successfully deleted"});
	}
);

module.exports = router;
