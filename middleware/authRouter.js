const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;

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
	if (!isValid)
		return res.status(400), res.json({ error });

	if (!/^[A-Za-z0-9._%+-]+@newage\.io$/.test(email))
		return (
			res.status(400),
			res.json({
				error: "Only emails with newage domain are allowed",
			})
		);

	const hash = bcrypt.hashSync(password, saltRounds);
	console.log(hash);
	return res.status(200), res.json("signup");
});

module.exports = router;
