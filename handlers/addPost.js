var db = require("../db");

module.exports = function(req, reply) {
	reply.view("blogpost", {
		title: "Add New Post",
		blogpost: {
			id: "new"
		}
	});
};