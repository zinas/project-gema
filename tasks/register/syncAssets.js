module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
    'copy:dev',
		'jst:dev',
		'less:dev',
		'sync:dev',
    'browserify:dev'
	]);
};
