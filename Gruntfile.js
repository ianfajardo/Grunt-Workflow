module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		express: {
			all:{
			  options: {
				port: 9000,
				hostname: "0.0.0.0",
				bases:[__dirname],
				livereload:true
			  }
		  }
		},
		watch: {
		  all: {
			// Replace with whatever file you want to trigger the update from
			// Either as a String for a single entry 
			// or an Array of String for multiple entries
			// You can use globing patterns like `css/**/*.css`
			// See https://github.com/gruntjs/grunt-contrib-watch#files
			files: ['index.html', 'style.css'],
			options: {
			  livereload: true
			}
		  }
		},
		dom_munger: {
			your_target: {
				options: {
					remove: '#removeMe',
					append: {selector:'#seeMe', html:'<div id="appended">Im being appended</div>'}
				},
				src: 'index.html',
				dest: 'dist/index.html'
			},
		},
	});

	grunt.loadNpmTasks('grunt-dom-munger');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
	
	grunt.registerTask('default', ['dom_munger']);
	grunt.registerTask('live', ['express', 'watch']);
};
