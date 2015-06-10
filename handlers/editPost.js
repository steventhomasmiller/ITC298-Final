var Post = require("../models/blogpost");

module.exports = function (req, reply){
	var blogpost = new Post({
		slug: req.parama.slug
	});
	post.load(function(){
		reply.view("blogpost", {
			title: "Edit Post",
			blogpost: blogpost.toJSON()
		})
	})
}