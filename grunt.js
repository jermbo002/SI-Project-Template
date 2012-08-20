/*global module:false*/
module.exports = function( grunt ) {
    'use strict';

    // Grunt Configuration
    // ------------------
    grunt.initConfig({

        // Project configuration
        // ---------------------

        // package.json included in configuration
        pkg: {
            "name": "Project Name",
            "appDir": "app dir",
            "author": {
                "name"  : "Jeremy Burton",
                "email" : "jeremy@select-interactive.com",
                "url"   : "www.select-interactive.com"
            }
        },
        
        // compile .scss/.sass to .css using Compass
        compass: {
            dev: {
                src: 'css/sass',
                dest: 'css',
                outputstyle: 'expanded',
                linecomments: true
            },
            prod: {
                src: 'css/sass',
                dest: 'css',
                outputstyle: 'compressed',
                linecomments: false,
                forcecompile: true
            }
        },

        // optiize images
        img: {
            allImgs: {
                src: 'img'
            }
        },

        // jhHint - set options
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
        },

        // js linting
        lint: {
            files: ['grunt.js','js/<%= pkg.appDir %>/*.js']
        },

        // watch task
        watch: {
            compass: {
                files: [
                    'css/sass/*.scss', 
                    'css/sass/**/*.scss'
                ],
                tasks: 'compass:dev'
            },

            lint: {
                files: ['grunt.js','js/<%= pkg.appDir %>/*.js'],
                tasks: 'lint'
            }
        }
    });
    
    // Default task -- watch
    grunt.registerTask( 'default', 'watch' );

    // Build task -- optimze for production
    grunt.registerTask( 'build', 'lint compass:prod img:allImgs' );
    
    // Compass plugin task
    grunt.loadNpmTasks( 'grunt-compass' );

    // Image optimization task
    grunt.loadNpmTasks( 'grunt-img' );
};