const express = require("express");
const app = express();
const port = 3000;

const authRouter = require("./routes/authRouter");

app.use(express.json());
app.use("/api/auth", authRouter);

app.use((req, res) => (res.status(404), res.json()));

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
