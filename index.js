var hapi = require("hapi");
var server = new hapi.Server({
  connections: {
    router: {
      stripTrailingSlash: true
    }
  }
});


server.connection({ port: 8000 });

server.views({
  engines: {
    html: require("handlebars") //whenever ends in html, it will use handlebars
  },
  path: "views/templates",
  layoutPath: "views",
  layout: "default",
  isCached: false,
});

//var Blogpost = require("./models/blogpost"); //capitalize; importing constructor

var sql = require("./db"); //sql is facade

sql.init(function(err) {
  if (err) {
    return console.error("I'm sorry, but there is a database error.", err);
  }
  console.log("The database is ready.");
  server.start(function() {
    console.log("And so is the server.");
  });
}); //anything that happens after the database is ready.

var routes = require("./routes")
server.route(routes);