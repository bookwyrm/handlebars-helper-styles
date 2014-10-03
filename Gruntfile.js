/* globals module:true */
module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Run mocha tests.
    mochaTest: {
      tests: {
        options: {
          reporter: 'spec'
        },
        src: [ 'test/**/*_test.js' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['mochaTest']);
};
