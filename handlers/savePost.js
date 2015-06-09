var blogPost = require("../models/blogpost");

module.exports = function(req, reply) {
	var payload = req.payload;
	var model = new Post(payload);
	model.save(function(err) {
		if (err) {
			console.error(err);
		}
		reply.redirect("/blogpost/")
	});
};