const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const saltRounds = 10;
const JWT_SECRET_KEY = "V*i4AECQA^*zjN";

const {
	writeUserToDatabase,
	readUserFromDatabase,
	readUserFromDatabaseWithIndex,
	updateDatabaseRecord,
} = require("../utils/database");
const {
	privateRouteMiddleware,
	ownerMiddlerware,
} = require("../middleware/privateRouteMiddleware");

const isBirthdayValid = (birthday) => {
	if (birthday.length !== 10 || !/\d{4}-\d{2}-\d{2}/.test(birthday))
		return [
			false,
			"Birthday format isn't valid. Please use following format: YYYY-MM-DD",
		];

	const date = new Date(birthday);
	if (!date.getDate()) return false, "Birthday value isn't valid";

	if (date.getFullYear() < 1920)
		return [false, "Birthday shouldn't be older than 1920-01-01"];

	const differenceYears = Math.floor(
		Math.abs(new Date() - date) / (1000 * 60 * 60 * 24 * 365)
	);
	if (differenceYears < 18)
		return [false, "User should be at least 18 years old"];

	return [true];
};

router.post("/sign-up", (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const birthday = req.body.birthday;
	const email = req.body.email;
	const password = req.body.password;

	const isEmailUsed = readUserFromDatabase(email);
	if (isEmailUsed)
		return (
			res.status(400),
			res.json({
				error: "We already have a record with this email",
			})
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

	const [isValid, error] = isBirthdayValid(birthday);
	if (!isValid) return res.status(400), res.json({ error });

	if (!/^[A-Za-z0-9._%+-]+@newage\.io$/.test(email))
		return (
			res.status(400),
			res.json({
				error: "Only emails with newage domain are allowed",
			})
		);

	const hash = bcrypt.hashSync(password, saltRounds);
	writeUserToDatabase({ firstName, lastName, birthday, email, password: hash });

	return res.status(200), res.json({ status: "success" });
});

router.post("/sign-in", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const userDetails = readUserFromDatabase(email);
	if (!userDetails)
		return (
			res.status(400),
			res.json({
				error: "This email doesn't seem familiar. Try another email",
			})
		);

	const isPasswordCorrect = bcrypt.compareSync(password, userDetails.password);
	if (!isPasswordCorrect)
		return (
			res.status(400),
			res.json({
				error: "Password seems to be incorrect",
			})
		);
	delete userDetails["password"];
	const token = jwt.sign(userDetails, JWT_SECRET_KEY, { expiresIn: "60m" });
	return (
		res.header("Authorization", `Bearer ${token}`),
		res.status(200),
		res.json({ status: "success" })
	);
});

router.get("/me", privateRouteMiddleware, (req, res) => {
	const user = jwt.decode(req.headers.authorization.split("Bearer ")[1]);
	res.send({ user });
});

router.put(
	"/:userid",
	[privateRouteMiddleware, ownerMiddlerware],
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
		existingData.firstName = firstName;
		existingData.lastName = lastName;

		const user = updateDatabaseRecord(userId, existingData);

		return res.send({ user });
	}
);
module.exports = router;
