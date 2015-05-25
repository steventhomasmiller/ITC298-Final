var hapi = require("hapi");
var server = new hapi.Server();
server.connection({ port: 8000 });
server.start();

// server.views({
//   path:
// })

server.route({
  method: "GET",
  path: "/",
  handler: function(req, reply) {
    reply("Hello from Hapi, Grunt and No Demon.");
  }
});