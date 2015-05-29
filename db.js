//db.js

var async = require("async");
var sqlite = require("sqlite3");
var db;

var blogpost = new sqlite.Database("blogpost.db", function() {
	blogpost.run("CREATE TABLE IF NOT EXISTS blogpost (id, title, content, author, category, tags, images, meta);");
	console.log(blogpost);

});

db.get("SELECT * FROM blogpost", function(err, result){
	console.log("result");
});

module.exports = blogpost;