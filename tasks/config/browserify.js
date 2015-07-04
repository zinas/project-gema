module.exports = function(grunt) {
  var dest, files = {};

  grunt.file.expand("assets/jsx/views/**/*.jsx").forEach(function (src) {
    dest = src.replace('assets/jsx/views/', '').replace(/\//g, '-').replace('.jsx', '.js');
    dest = '.tmp/public/js/' + dest;
    files[dest] = src;
  });

  grunt.config.set('browserify', {

    options:      {
      transform:  [ require('grunt-react').browserify ],
    },
    dev:          {
      files:files,
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
};