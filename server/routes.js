//routes.js

var blogpost = require("./models/blogpost");

module.exports = [
	{
		method: "GET",
		path: "/"
	},
	{
		method: "GET",
		path: "/assets/{param*}",
		handler: {
			directory: {
				path: "build/"
			}
		}
	},

]