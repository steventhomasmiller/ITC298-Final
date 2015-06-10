var Post = require("../models/blogpost");

module.exports = function(req, reply) {
	var blogpost = new Post({
		slug: req.params.slug
	});
	blogpost.load(function() {
		reply.view("view", {
			title: blogpost.get("title"),
			blogpost: blogpost.toJSON()
		})
	})
};