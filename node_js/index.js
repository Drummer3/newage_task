const express = require("express");
const app = express();
const port = 8000;

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use((req, res) => (res.status(404), res.json()));

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
