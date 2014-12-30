module.exports = function(grunt) {


	/* Grunt Init Config
	==================================================*/
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		compass:{
			dist:{
				options:{
					sassDir: 'sass',
					cssDir: 'css',
					outputStyle: 'compressed',
					environment: 'development'
				}
			}
		},

		//javascript file minification
		uglify:{
			my_target:{
				files: {
					'scripts/scripts.min.js' : ['scripts/*.js']
				}
			}
		},

		clean:{
			js: ['scripts/scripts.min.js']
		},

		//jshint, allow tasks to go on with error
		jshint: {
			options: {
				force: true
			}
		},

		//watch task runner for live changes
		watch: {  
		  gruntfile: {
				files: ['Gruntfile.js'],
				tasks: ['jshint'],
				options: {
					spawn: false,
					livereload: true
				}
		  },
		  css: { 
				files: ['sass/*.scss'],
				tasks: ['compass'],
		  },
		  scripts:{
				files:['scripts/*.js'],
				tasks: ['jshint', 'clean:js' ,'uglify'],
				options: {
					spawn: false,
					livereload: true
				}
		  },
		  html: {
		  	files: ['index.html', 'scripts/*.js'],
		  	options: {
					livereload: true
		  	}
		  }
		},

		//notification system for livereloading changes
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

grunt.event.on('watch', function(action, filepath, target) {
  grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
});


	/* Grunt Task Load
	==================================================*/
	grunt.loadNpmTasks('grunt-dom-munger');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-notify');
	

	/* Grunt Task Terminal Tasks
	==================================================*/
	//grunt.task.run('notify_hooks'); 

	grunt.registerTask('default', ['notify_hooks','dom_munger']);

	//run livereloading process watch
	grunt.registerTask('live', ['notify_hooks', 'scripts' , 'watch']);

	//run jshint, clean minified script, write new minified script to file
	grunt.registerTask('scripts', ['jshint', 'clean:js' , 'uglify']);
};
