var Post = require("../models/blogpost");

module.exports = function(req, reply){
	var blogpost = new Post({
		slug: req.params.slug
	});
	blogpost.load(function(){
		console.log(blogpost.toJSON());
		reply.view("blogpost", {
			title: "Edit Post",
			blogpost: blogpost.toJSON()
		})
	})
}