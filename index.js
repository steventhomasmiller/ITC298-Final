var hapi = require("hapi");
var server = new hapi.Server();


server.connection({ port: 8000 });

server.views({
  engines: {
    html: require("handlebars") //whenever ends in html, it will use handlebars
  },
  path: "./views",
  isCached: false
});

var Blogpost = require("./models/blogpost"); //capitalize; importing constructor

var sql = require("./db"); //sql is facade
sql.init(function() {
  console.log("The database is ready."); //server will not start until table exists
  var blogpost = new Blogpost({
    task: "Start server"
  });
  blogpost.create(function(err) {
    if(err) {
      console.error(err);
    }
    sql.connection.all("INSERT INTO blogpost(id, title, date, content, author, category, tags, images, meta) VALUES(1, 'Hello','Today', 'Hello world', 'Me', 'Basketball', 'Lalala', 'none', 'LeBron');", function(err, results) {
      console.log(err, results)
    });
    sql.connection.all("SELECT * FROM blogpost", function(err, results) {
      console.log(err, results)
    });

  });
  server.start(); //server won't start until database is ready.
}); //anything that happens after the database is ready.

