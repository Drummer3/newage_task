const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const DATABASE_FILE = "./database/users.json";

function writeUserToDatabase(userDetails) {
	const userId = uuidv4();
	userDetails.uuid = userId;
	const existingFile = fs.readFileSync(DATABASE_FILE);
	const existingData = JSON.parse(existingFile);
	existingData[userId] = userDetails;
	fs.writeFileSync(DATABASE_FILE, JSON.stringify(existingData));
	return userDetails;
}

function readUserFromDatabase(email) {
	const database = JSON.parse(fs.readFileSync(DATABASE_FILE));
	const keys = Object.keys(database);
	let userDetails = null;
	keys.forEach((user) => {
		if (database[user].email === email) userDetails = database[user];
	});
	return userDetails;
}

module.exports = { writeUserToDatabase, readUserFromDatabase };
