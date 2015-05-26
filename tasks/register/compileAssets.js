module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
		'less:dev',
    'browserify:dev',
		'copy:dev'
	]);
};
