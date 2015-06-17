var db = require("../db");

module.exports = function(req, reply) {
	console.log(req.state);
	if (!req.state.user){
		return reply.redirect("/login");
	} 
	reply.view("blogpost", {
		title: "Add New Post",
		blogpost: {
			id: "new"
		}
	});
};