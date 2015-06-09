var blogPost = require("../models/blogpost");

module.exports = function(req, reply) {
	var payload = req.payload;
	var model = new blogPost(payload);
	model.save(function(err) {
		if (err) {
			console.error(err);
		}
		var response = reply ("This is saved.");
		response.statusCode = 302;
		response.headers.Location = "/blogposts";
	});
};