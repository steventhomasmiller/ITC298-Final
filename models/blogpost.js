//lets us talk to the database; not itself the database.
//device by which we talk about this data

var Backbone = require("backbone");
var sql = require("../db"); //.. is for the parent directory
var moment = require ("moment");

var LOAD = "SELECT *, rowid AS id FROM blogpost WHERE slug = $slug;";
var SAVE_NEW = "INSERT INTO blogpost(title, slug, content, created_at, formatted, author, category, tags, meta) VALUES($title, $slug, $content, datetime('now'), $formatted, $author, $category, $tags, $meta);";
var UPDATE = "UPDATE blogpost SET title = $title, content = $content, created_at = datetime('now'), formatted = $formatted, author = $author, category = $category, tags = $tags, meta = $meta, slug = $slug WHERE id = $id";
var LAST = "SELECT last_insert_rowid() AS rowid FROM blogpost;";

//extend function create models

module.exports = Backbone.Model.extend({
	//custom model -- how it's different
	//make properties same as columns in database
	defaults: {
		id: "new",
		title: "New Blog Post",
		content: "Insert Content",
		author: "Insert Author Name",
		category: "Insert Category",
		tags: "Insert Tags",
		meta: "Insert Meta Data"
	},
	load: function(done) {
		var self = this;
		var query = sql.connection.prepare(LOAD);
		var data = this.toJSON();
		query.get({
			$slug: data.slug
		}, function(err, loaded) {
			console.log(loaded);
			self.set(loaded);
			done(err);
		});
	},
save: function(done){
	var self = this;
	var id = this.id;
	// var q = id =="new" ? SAVE_NEW : UPDATE;
	// var q = id;
	// if (id == "new")
	// {
	// 	SAVE_NEW;
	// } else
	// {
	// 	UPDATE;
	// }
	var q = id =="new" ? SAVE_NEW : UPDATE;
	var query = sql.connection.prepare(q);
	var data = this.toJSON();
	var slug = this.get("title").toLowerCase();
	var space = /\s/g;
	slug = slug.replace(space, "-");

	query.run({
		$id: id == "new" ? undefined : data.id,
		$title: data.title,
		$slug: slug,
		$formatted: moment().format("dddd MMMM Do, YYYY"),
		$content: data.content,
		$author: data.author,
		$category: data.category,
		$tags: data.tags,
		$meta: data.meta
	}, done);
		//when done, call the callback
	}
});

//capital letter = put "new"...

// var reminder = new Reminder(); 

// console.log(reminder.toJSON());


//module.exports = Blogpost; //any module can require this function 