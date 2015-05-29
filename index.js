var hapi = require("hapi");
var server = new hapi.Server();
var fs = require("fs");
var sqlite = require("sqlite3");
//var db = require("/.db");

server.connection({ port: 8000 });

var db = new sqlite.Database("auth.db", function() {
  //table has two columns - USERNAME & SESSION
  db.run("CREATE TABLE IF NOT EXISTS auth (username, session)",
    function() {
      console.log("Starting server.");
      server.start();
    });
});



//server.start();

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