const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const DATABASE_FILE = "./database/users.json";

function writeUserToDatabase(userDetails) {
	userDetails.uuid = uuidv4();
	const existingFile = fs.readFileSync(DATABASE_FILE);
	const existingData = JSON.parse(existingFile);
	existingData.push(userDetails);
	fs.writeFileSync(DATABASE_FILE, JSON.stringify(existingData));
	return userDetails;
}

function readUserFromDatabase(email) {
	const database = JSON.parse(fs.readFileSync(DATABASE_FILE));
	const userDetails = database.filter((record) => record.email === email);
	if (userDetails) return userDetails[0];
	return {};
}

module.exports = { writeUserToDatabase, readUserFromDatabase };
