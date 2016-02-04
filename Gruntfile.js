module.exports = function (grunt) {
    
    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        browserify: {
			dist: {
				options: {
					compact: false,
					comments: true,
					transform: [
						[
							'babelify', {
								loose: 'all'
							}
						]
					]
				},
				files: {
					'public/js/dest/bundle.js': ['public/js/src/app.js']
				}
			}
		},
		watch: {
		    javascript: {
		        files: 'public/js/src/**/*.js',
				tasks: ['browserify']
		    },
		    options: {
				interrupt: true,
				// Default port: 35729
				livereload: true
			}
		}
    });
    
    grunt.registerTask('default', ['browserify', 'watch']);
};