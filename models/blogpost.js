var Backbone = require("backbone");
var db = require("../db");

var LOAD = "SELECT id, title, content, author, category, tags, images, meta from blogpost WHERE rowid = $id;";
var SAVE_NEW = "INSERT INTO blogpost(id, title, content, author, category, tags, images, meta) VALUES($id, $title, $content, $author, $category, $tags, $images, $meta);";
var UPDATE = "UPDATE blogpost SET id =$id, title=$title, content=$content, author=$author, category=$category, tags=$tags, images=$images, meta=$meta;";