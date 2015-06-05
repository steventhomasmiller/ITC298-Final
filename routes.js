module.exports = [

	{
		method: "GET",
		path: "/",
		handler: require("./handlers/home") //imports from individual and gives us access
	}, 
	{
		method: "GET",
		path: "/posts",
		handler: require("./handlers/posts")
	}, 
	{
		method: "GET",
		path: "/posts/{title}",
		handler: require("./handlers/getPost")
	},
	{
		method: "POST",
		path: "/posts/{id}",
		handler: require("./handlers/setPost")
	}, {
		method: "GET",
		path: "/assets/{param*}",
		handler: {
			directory: {
				path: "public"
			}
		}
	}];