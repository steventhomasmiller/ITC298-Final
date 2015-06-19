module.exports = function(req, reply){

	if (!req.state.user){
			return reply.redirect("/login");
		} 
	reply.view("about" , {
		title: "About"
	});
};

