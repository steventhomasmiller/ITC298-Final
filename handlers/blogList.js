var Backbone = require("backbone");
var sql = require("../db");
var Blogpost = require("./blogpost");//in same folder
	
var BlogList = Backbone.Collection.extend({
	model: Blogpost,
	load: function(callback) {
		var self = this;
		//select all reminders from database
		var q = "SELECT * FROM blogpost;";
		sql.connection.all(q, function(err, results) {
			//fill this list with Reminders based on that data
			self.reset(results);
			callback();
		});
	}
});

module.exports = BlogList;