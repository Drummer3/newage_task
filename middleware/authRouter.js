const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;

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
