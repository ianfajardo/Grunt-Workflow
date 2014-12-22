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
			files: ['index.html', 'style.css'],
			options: {
			  livereload: true
			}
		  }
		},
		notify_hooks: {
		    options: {
		      enabled: true,
		      max_jshint_notifications: 5,
		      success: true,
		      duration: 3
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
	grunt.loadNpmTasks('grunt-notify');
	grunt.task.run('notify_hooks'); 
	grunt.registerTask('default', ['notify_hooks','dom_munger']);
	grunt.registerTask('live', ['notify_hooks', 'express', 'watch']);
};
