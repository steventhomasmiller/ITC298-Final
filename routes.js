module.exports = [

	{
		method: "GET",
		path: "/",
		handler: require("./handlers/home") //imports from individual and gives us access
	}, 
	{
		method: "GET",
		path: "/blogpost",
		handler: require("./handlers/home")
	}, 
	{
		method: "GET",
		path: "/blogpost/{slug}/edit",
		handler: require("./handlers/editPost")
	},
	// {
	// 	method: "POST",
	// 	path: "/blogpost/{slug}",
	// 	handler: require("./handlers/viewPost")
	// }, 
	{
		method: "POST",
		path: "/blogpost/{slug}",
		handler: require("./handlers/savePost")
	},
	// {
	// 	method: "GET",
	// 	path: "blogpost/new",
	// 	handler: require("./handlers/addPost")
	// },

	{
		method: "GET",
		path: "/assets/{param*}",
		handler: {
			directory: {
				path: "public"
			}
		}
	}];