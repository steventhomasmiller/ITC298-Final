//lets us talk to the database; not itself the database.
//device by which we talk about this data

var Backbone = require("backbone");
var sql = require("../db"); //.. is for the parent directory

var INSERT = "INSERT INTO blogpost(id, title, date, content, author, category, tags, images, meta) VALUES($id, $title, $date, $content, $author, $category, $tags, $images, $meta);";


//extend function create models

var Blogpost = Backbone.Model.extend({
	//custom model -- how it's different
	//make properties same as columns in database
	defaults: {
		id: "",
		title: "New Blog Post",
		date: "Insert Date",
		content: "Insert Content",
		author: "Insert Author Name",
		category: "Insert Category",
		tags: "Insert Tags",
		images: "Insert Image",
		meta: "Insert Meta Data"
	},
	create: function(callback) {
		callback = callback || function() {};
		//get its own data
		var data = this.toJSON(); //objects created from this function
		//run an INSERT on the database
		var q = "INSERT INTO blogpost(id, title, date, content, author, category, tags, images, meta) VALUES($id, $title, $date, $content, $author, $category, $tags, $images, $meta);"; //mustache tags, but for sql
		//pass in its data
		sql.connection.run(q, {
			$id: data.id,
			$title: data.title,
			$date: data.date,
			$content: data.content,
			$author: data.author,
			$category: data.category,
			$tags: data.tags,
			$images: data.images,
			$meta: data.meta
		}, callback);
		//when done, call the callback
	}
});

//capital letter = put "new"...

// var reminder = new Reminder(); 

// console.log(reminder.toJSON());


module.exports = Blogpost; //any module can require this function 