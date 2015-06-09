//home.js

var db = require("../db");

module.exports = function(req, reply){
		db.showAllPosts(function(err, blogpost) {
			blogpost.forEach(function(blogpost) {
				blogpost.truncated = blogpost.content.substr(0, 2);
			});
		//list is now ready
		reply.view("index", { //appears on home page
			blogpost: blogpost, //wherever "test" is will be replaced by this object
			title: "Home",
		});
	})
};

	//npm nodemon -g
	//nodemon index.js