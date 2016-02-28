module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			javascript: {
				files: 'public/js/src/**/*.js',
				tasks: ['browserify']
			},
			jade: {
				files: 'templates/**/*.jade'
			},
			sass: {
				files: 'public/scss/**/*.scss',
				tasks: ['sass']
			},
			options: {
				interrupt: true,
				// Default port: 35729
				livereload: 8081
			}
		},
		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'public/css/main.css': 'public/scss/main.scss'
				}
			}
		},
		browserify: {
			dist: {
				options: {
					compact: false,
					comments: true,
					alias: {
						'a': './public/js/src/a.js'
					},
					transform: [
						[
							'babelify', {
								loose: 'all'
								// presets: ['es2015'],
								// plugins: ['transform-decorators-legacy']
							}
						]
					]
				},
				files: {
					// if the source file has an extension of es6 then
					// we change the name of the source file accordingly.
					// The result file's extension is always .js
					'public/js/dest/bundle.js': ['public/js/src/app.component.js'],
				}
			}
		},
	});

	grunt.registerTask('compile', ['browserify', 'sass']);
	grunt.registerTask('default', ['compile', 'watch']);
};
