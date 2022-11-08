const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const DATABASE_FILE = "./database/users.json";
const BLACKLIST_FILE = "./database/blacklist.json";

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

function readUserFromDatabaseWithIndex(index) {
	const database = JSON.parse(fs.readFileSync(DATABASE_FILE));
	return database[index];
}

function updateDatabaseRecord(index, userDetails) {
	const database = JSON.parse(fs.readFileSync(DATABASE_FILE));
	database[index] = userDetails;
	fs.writeFileSync(DATABASE_FILE, JSON.stringify(database));
	return database[index];
}

function deleteUserFromDatabase(index) {
	const database = JSON.parse(fs.readFileSync(DATABASE_FILE));
	delete database[index];
	fs.writeFileSync(DATABASE_FILE, JSON.stringify(database));
	console.log(database);
	return database[index];
}

function blacklistToken(token) {
	const blacklist = JSON.parse(fs.readFileSync(BLACKLIST_FILE));
	blacklist.push(token);
	fs.writeFileSync(BLACKLIST_FILE, JSON.stringify(blacklist));
}

function getBlacklistToken() {
	const blacklist = JSON.parse(fs.readFileSync(BLACKLIST_FILE));
	return blacklist;
}

module.exports = {
	writeUserToDatabase,
	readUserFromDatabase,
	readUserFromDatabaseWithIndex,
	updateDatabaseRecord,
	deleteUserFromDatabase,
	blacklistToken,
	getBlacklistToken,
};
