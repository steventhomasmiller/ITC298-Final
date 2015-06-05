var Post = require("../models/blogpost");

module.exports = function(req, reply) {
	var id = req.params.id;
	var model = new Post({
		id: id
	});

	if (id == "new"){
		return reply.view("post", {
			title: "New Blog Post",
			post: model.toJSON()
		});
	}
	model.set("id", id);
	model.load(function(err) {
		var data;
		if (err) {
			console.log(err);
		} else {
			data = model.toJSON();
		}
		reply.view("post", {
			title: data.name,
			post: data
		});
	});
};