//blogpostHandler.js

var blogpost = require("blogpost");
var fields = forms.fields;
var forms = require("forms");
var widgets = forms.widgets;

module.exports = function(req, reply){
	reply.view("login", {title: "LANDGRANT", pageTitle: "Blogpost", formMethod:"POST", formBody: loginForm.toHTML(), formAction: "/post", formButton: "Publish"});
}; 