var hapi = require("hapi");
var server = new hapi.Server();
var fs = require("fs");

server.connection({ port: 8000 });

server.start();

server.views({
  path: "templates",
  engines: {
  	html: require("handlebars")
  },
  layoutPath: "layouts",
  layout: "default",
  partialsPath: "templates/partials",
  isCached: false
});

server.route({
  method: "GET",
  path: "/",
  handler: function(req, reply) {
    reply.view("index", {
    	title: "Home"
    });
  }
});

server.route({
	method: "GET",
	path: "/example",
	handler: function (req, reply){
		fs.readFile("example.json",
		"utf8", function(err, data) {
		reply.view("example", {
			title: "Example",
			example: JSON.parse(data)
		});	
	});
  }
});