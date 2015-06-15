//Got some help from Christine on this page

var crypto = require("crypto");
var db = require("../db");

module.exports = function (req, reply) {
	var md5 = crypto.createHash("md5");

	db.connection.get("SELECT * FROM users WHERE username = $username", {
		$username: req.payload.name
	}, function(err, expected) {
		
		console.log(req.payload, expected, err);

		if (expected && req.payload.password == expected.password) {
			var response = reply("Signed in.");
			var id = req.payload.name + Date.now();
			md5.update(id);
			id = md5.digest("hex");
			response.state("user", req.payload.name);
			response.state("session", id);
			console.log(req.payload.name, id);

			db.connection.run("UPDATE users session = $session WHERE username = $user",{
				$user: req.payload.name,
				$session: id
			});

		} else {
			reply.redirect("/");
		}
	});
};