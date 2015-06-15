//database.js

var sqlite = require("sqlite3");
var db;
var async = require("async");

var users = {
	steve: "sh4b4ng!",
	guest: "p@ssw0rd"
};

var facade = {
	connection: null,
	init: function(ready) {
		db = new sqlite.Database("blogpost.db", function(err) {
			if (err) {
				console.error("Something is wrong with the database.");
				process.exit(1);
			}
		//creating db
		facade.connection = db; // once connection is made, they can use this
		
		async.series([
			function(c) {
				db.run("CREATE TABLE IF NOT EXISTS blogpost (id INTEGER PRIMARY KEY, title, slug, created_at, formatted, content, author, category, tags, meta);", c);
			},
				function(c) {
					db.run("CREATE TABLE IF NOT EXISTS users (username, session, password);", c);
				},
				function(c) {
					db.run("INSERT INTO users (username, password) VALUES ($username, $password);", {
						$username: "guest",
						$password: "guest"
					}, c);
				}
			], function(err) {
				db.all("SELECT * FROM users", console.log.bind(console));
				console.log(err);
				if (ready) ready(err)
			});
		});
	},
	showAllPosts: function(c) {
		db.all("SELECT *, rowid from blogpost ORDER BY created_at DESC;", c);
	}
};

module.exports = facade; //what we're exporting, but not funcitonally anything. Just a grab bag.

