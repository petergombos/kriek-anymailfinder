/*global module:false*/
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    watch: ['*.js','**/*.js', 'data/**/*.json', 'data/*.json']
                }
            }
        }
    });


    grunt.registerTask('server', ["nodemon"]);

};