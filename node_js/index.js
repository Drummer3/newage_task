const express = require("express");
const app = express();
const port = 8000;

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", ["Content-Type", "Authorization"]);
	next();
});

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use((req, res) => (res.status(404), res.json()));

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
