module.exports = function(grunt) {
    'use strict';
    
    // Load plugins for tasks.
    grunt.loadNpmTasks('grunt-readme');

    // Default task(s).
    grunt.registerTask('default', ['readme']);
};
