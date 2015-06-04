//home.js

var BlogList = require("../models/blogList");

module.exports = function(req, reply){
		var list = new BlogList();
		list.load(function() {
			var data = list.toJSON();
			console.log(data);
		//list is now ready
		reply.view("home", { //appears on home page
			test: "It's alive, yo.", //wherever "test" is will be replaced by this object
			blogpost: data //view now has access to blogposts tag 
		});
	});
};

	//npm nodemon -g
	//nodemon index.js