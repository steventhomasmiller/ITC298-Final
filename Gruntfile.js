//Gruntfile.js

module.exports = function(grunt){

	grunt.registerTask("hello", function() {
		console.log("Hellay from Grunt.");
		grunt.file.write("build/test.txt",
		"This file is written sync.")
	});

	grunt.registerTask("hi", ["hello"]);

	grunt.loadNpmTasks("grunt-autoprefixer");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-concurrent");
	grunt.loadNpmTasks("grunt-nodemon");

	grunt.registerTask("default", ["autoprefixer", "concurrent"]);

	grunt.initConfig({
		concurrent: {
			dev: {
				tasks: ["watch", "nodemon"],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		nodemon: {
			dev: {
				script: "index.js"
			}
		},
		watch: {
			less: {
				files: "src/css/**/*.less",
				tasks: ["less"]
			},
			html: {
				files: "./**/*.html",
				tasks: ["autoprefixer"]
			},
			options: {
				livereload: true
			},
			css: {
				files: "src/css/**.css",
				tasks: ["autoprefixer"]
			}
		},
		less: {
			dev: {
				files: {
					"src/css/style.css": "src/styles/main.less"
				}
			}
		}
		autoprefixer: {
			dev: {
				expand: true,
				flatten: true,
				src: "src/css/style.css",
				dest: "build/css/"
			}
		}
	});
};