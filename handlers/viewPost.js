var blogPost = require("../models/blogpost");

module.exports = function(req, reply) {
	var blogpost = new blogpost({
		slug: req.params.slug
	});
	blogpost.load(function() {
		reply.view("view", {
			title: blogpost.get("title"),
			blogpost: blogpost.toJSON()
		})
	})
};