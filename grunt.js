/*global module:false*/
module.exports = function( grunt ) {

    // Project configuration.
    grunt.initConfig({
        pkg: {
            "name": "Project Name",
            "app": "app dir",
            "author": {
                "name"  : "Jeremy Burton",
                "email" : "jeremy@select-interactive.com",
                "url"   : "www.select-interactive.com"
            }
        },
        lint: {
            files: ['grunt.js','js/<%= pkg.app %>/*.js']
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'lint'
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                devel: true
            },
            globals: {
                jQuery: true
            }
        }
    });

    // Default task.
    grunt.registerTask('default', 'lint');
};
