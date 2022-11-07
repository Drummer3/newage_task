const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

function writeUserToDatabase(userDetails) {
	userDetails.uuid = uuidv4();
	const existingFile = fs.readFileSync("./database/users.json");
	const existingData = JSON.parse(existingFile);
	existingData.push(userDetails);
	fs.writeFileSync("./database/users.json", JSON.stringify(existingData));
}

module.exports = { writeUserToDatabase };
