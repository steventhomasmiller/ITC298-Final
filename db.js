//database.js

var sqlite = require("sqlite3");
var db;
var async = require("async");

var facade = {
	connection: null,
	init: function(ready) {
		db = new sqlite.Database("site.db", function(err) {
			if (err) {
				console.error("Something is wrong with the database.");
				process.exit(1);
			}
		//creating db
		facade.connection = db; // once connection is made, they can use this
		
		async.parallel([
			function(c) {
				db.run("CREATE TABLE IF NOT EXISTS blogpost (id, title, date, content, author, category, tags, images, meta);", c);
			},
				function(c) {
					db.run("CREATE TABLE IF NOT EXISTS user (firstName, lastName);",c);
				}
			], function(err) {
				console.log(err);
				if (ready) ready(err)
			});
		});
	},
	showAllPosts: function(c) {
		db.all("SELECT *, rowid from blogpost ORDER BY create_at DESC;", c);
	}
};

module.exports = facade; //what we're exporting, but not funcitonally anything. Just a grab bag.