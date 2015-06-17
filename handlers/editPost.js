var Post = require("../models/blogpost");

module.exports = function(req, reply){
	var blogpost = new Post({
		slug: req.params.slug
	});

	if (!req.state.user){
		return reply.redirect("/login");
	}
	
	blogpost.load(function(){
		console.log(blogpost.toJSON());
		reply.view("blogpost", {
			title: "Edit Post",
			blogpost: blogpost.toJSON()
		})
	})
}