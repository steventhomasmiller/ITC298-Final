var Backbone = require("backbone");
var db = require("../db");

var LOAD = "SELECT id, title, content, author, category, tags, images, meta from blogpost WHERE rowid = $id;";
var SAVE_NEW = "INSERT INTO blogpost(id, title, content, author, category, tags, images, meta) VALUES($id, $title, $content, $author, $category, $tags, $images, $meta);";
var UPDATE = "UPDATE blogpost SET id =$id, title=$title, content=$content, author=$author, category=$category, tags=$tags, images=$images, meta=$meta;";

module.exports = Backbone.Model.extend({
	defaults: {
		id = 1,
		title = "New Blog Post",
		content = "Insert Content",
		author = "Insert Author Name",
		category = "Insert Category",
		tags = "Insert Tags",
		images = "Insert Image",
		meta = "Insert Meta Data"
	},
	load: function(done) {
		var self = this;
		var query = db.connection.prepare(LOAD);
		var data = this.toJSON();
		query.get({
			$id: data.id
		}, function(err, loaded) {
			self.set(loaded);
			done(err)

		});
	},
	save: function(done){
		var self = this;
		var id = this.get("id");
		var q = id == "new" ? SAVE_NEW : UPDATE;
		var query = db.connection.prepare(q);
		var data = this.toJSON();
		query.run({
			$id: data.id,
			$title: data.title,
			$content: data.content,
			$author: data.author,
			$category: data.category,
			$tags: data.tags,
			$images: data.images,
			$meta = data.meta
		}, done);
		})
	}
});

//List of posts
//Add a post
//Edit **
//Single post
//WP?
//Stuff in database