module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        // Add global variables for asset locations
        dirs: {            
            sass_folder: 'html/assets/sass',
            css_folder: 'html/assets/css',
            js_folder: 'html/assets/js',
            images_folder: 'html/assets/images',
            // files for deploying
            build_folder: 'html/build'
            // Usage Example: 
                // dest: '<%= dirs.sass_folder %>/assets/sass' 
        },

        pkg: grunt.file.readJSON('package.json'),
        // Concat JS into single production file
        concat: {   
            dist: {
                src: [
                    // '<%= dirs.js_folder %>/vendor/*.js', // All JS in the libs folder
                    '<%= dirs.js_folder %>/vendor/jquery.js',  // Special Sauce trigger
                    '<%= dirs.js_folder %>/vendor/bootstrap.js',  // Special Sauce trigger
                    '<%= dirs.js_folder %>/vendor/underscore.js',  // Special Sauce trigger
                    // '<%= dirs.js_folder %>/lumi.js',  // Special Sauce trigger
                    // '<%= dirs.js_folder %>/lumi-blackjack.js',  // Special Sauce trigger
                    '<%= dirs.js_folder %>/main.js'  // This specific file
                ],
                dest: '<%= dirs.js_folder %>/build/production.js',
            }
        },
        // Uglify JS
        uglify: {
            build: {
                src: '<%= dirs.js_folder %>/build/production.js',
                // dest: '<%= dirs.js_folder %>/build/production-uglified.js'
                dest: '<%= dirs.build_folder %>/production-uglified.js'
            }
        },
        // Image Optimization
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'html/assets/images',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: 'html/build/images-optimized'
                }]
            }
        },
        // SASS - use if 3.3 sass required
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    require: 'susy'
                },
                files: {
                    '<%= dirs.css_folder %>screen.css': '<%= dirs.sass_folder %>screen.scss'
                    // 'css/build/mixins.css': 'styles/mixins.sass'
                }
            } 
        },
        // LIBSASS - else use libsass for faster compiling
        // libsass: {
        //     options: {
        //       loadPath: ['sass']
        //     },
        //     files: {[
        //         {
        //             expand: true,
        //             cwd: 'sass',
        //             src: ['**/*.scss'],
        //             dest: 'dist',
        //             ext: '.css'
        //         }
        //     ]},
        //   }
        // Compass
        compass: {
            // Optionally specify different dev and production
           dev: {
               options: {   
                   config: 'config.rb',
                   force: true,           
                   sassDir: ['<%= dirs.sass_folder %>'],
                   cssDir: ['<%= dirs.css_folder %>'],
                   require: 'susy',
                   environment: 'development'
               }
           },
           prod: {
               options: { 
                   config: 'config.rb',             
                   sassDir: ['<%= dirs.sass_folder %>'],
                   cssDir: ['<%= dirs.css_folder %>'],
                   require: 'susy',
                   environment: 'production'

              }
            }
        },
         
        // Autoprefix 
        autoprefixer: {
            options: {
              // Task-specific options go here.
              // What browsers to support? Good reference for browser support of features: http://caniuse.com/#search=transitions
              browsers: ['last 4 versions', '> 1%', 'ie 10', 'ie 11']
              
            },
            // prefix the specified file
            single_file: {
              options: {
                // Target-specific options go here.
              },
              src: 'html/assets/css/screen.css',
              dest: 'html/assets/css/autoprefixer/screen-autoprefixer.css'
            },
        },


        // PostCSS
        // postcss: {
        //     options: {
        //       map: true,
        //       processors: [
        //         require('autoprefixer-core')({browsers: ['last 4 versions', '> 1%', 'ie 10', 'ie 11']}).postcss,
        //         require('csswring').postcss
        //       ]
        //     },
        //     dist: {
        //       src: 'css/*.css'
        //     }
        // },

        // Watch 
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['<%= dirs.js_folder %>*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['<%= dirs.css_folder %>*.{scss,sass}'],
                // files: ['**/*.{scss,sass}'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            },
            // styles: {
            //     files: ['<%= dirs.css_folder %>style.css'],
            //     tasks: ['autoprefixer']
            // },
            compass: {
                files: ['html/assets/**/*.{scss,sass}'],
                tasks: ['compass:dev']
            }
        }   

    });

    // Tell Grunt we plan to use the following plug-ins:

    // General 
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // JS
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Images
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Styles
    grunt.loadNpmTasks('grunt-contrib-sass'); // use if sass 3.3 features are required, else use 
    // grunt.loadNpmTasks('grunt-libsass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    // grunt.loadNpmTasks('grunt-csswring');
    // grunt.loadNpmTasks('grunt-postcss');
    
    // Tell Grunt what to do when we type "grunt" into the terminal (default tasks)
    // PRODUCTION - Use these tasks
    // grunt.registerTask('default', ['concat','uglify','imagemin','compass:dev','autoprefixer' ]);
    // grunt.registerTask('default', ['concat','compass:dev' ]);
    // grunt.registerTask('default', ['concat','uglify' ]);
    // grunt.registerTask('default', ['concat','uglify','compass:dev' ]);
    // DEV 
    grunt.registerTask('default', ['concat','compass:dev']);

};