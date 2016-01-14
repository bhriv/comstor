module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        // Add global variables for asset locations
        dirs: {            
            sass_folder: 'html/assets/sass',
            css_folder: 'html/assets/css',
            js_folder: 'html/assets/js',
            js_libs_folder: 'html/assets/from-symfony/js/libs',
            js_vendor_folder: 'html/assets/vendor',
            js_lumious_reports: 'html/assets/js/reports',
            images_folder: 'html/assets/images',
            // files for deploying
            production_build_folder: 'html/production_build'
            // Usage Example: 
                // dest: '<%= dirs.sass_folder %>/assets/sass' 
        },

        pkg: grunt.file.readJSON('package.json'),
        // Concat JS into single production file
        concat: {
            gumby: {
                src: [
                    '<%= dirs.js_libs_folder %>/gumby.js', 
                    '<%= dirs.js_libs_folder %>/ui/*.js', 
                    '<%= dirs.js_libs_folder %>/gumby.init.js', 
                ],
                dest: '<%= dirs.js_folder %>/build/concat-gumby.js',
            },
            ui_libs: {
                src: [
                    '<%= dirs.js_libs_folder %>/jquery-ui-1.11.4.js',
                    '<%= dirs.js_libs_folder %>/fp_js_validator.js',
                    '<%= dirs.js_libs_folder %>/retina.js',
                    '<%= dirs.js_libs_folder %>/respond.js',
                    '<%= dirs.js_libs_folder %>/dna.js',
                    '<%= dirs.js_libs_folder %>/dumper.js',
                    '<%= dirs.js_libs_folder %>/tablesorter/*.js',
                    '<%= dirs.js_libs_folder %>/sortable.js',
                    '<%= dirs.js_libs_folder %>/selectBoxIt.min.js',
                ],
                dest: '<%= dirs.js_folder %>/build/concat-ui_libs.js',
            },
            ui_vendor: {
                src: [
                    '<%= dirs.js_vendor_folder %>/jquery-ui.js',
                    '<%= dirs.js_vendor_folder %>/jquery.placeholder.js',
                    '<%= dirs.js_vendor_folder %>/bootstrap.js',
                    '<%= dirs.js_vendor_folder %>/underscore.js',
                    '<%= dirs.js_vendor_folder %>/moment/moment.min.js',
                    '<%= dirs.js_vendor_folder %>/chart/Chart.min.js',
                    '<%= dirs.js_vendor_folder %>/jquery-plugin-query-object-master/jquery.query-object.js',
                    '<%= dirs.js_vendor_folder %>/Pikaday-master/pikaday.js',
                    '<%= dirs.js_vendor_folder %>/ckeditor/ckeditor.js',
                    '<%= dirs.js_vendor_folder %>/jQuery-File-Upload-master/js/jquery.fileupload.js',
                ],
                dest: '<%= dirs.js_folder %>/build/concat-ui_vendor.js',
            },
            lumious_reports: {
                src: [
                    '<%= dirs.js_lumious_reports %>/report_filters.js',
                    '<%= dirs.js_lumious_reports %>/report_students_access.js',
                    '<%= dirs.js_lumious_reports %>/report_students_performance.js',
                    '<%= dirs.js_lumious_reports %>/report_queries_questions.js',
                    '<%= dirs.js_lumious_reports %>/report_queries_attempts.js',
                    '<%= dirs.js_lumious_reports %>/report_concatenated_rows.js',
                ],
                dest: '<%= dirs.js_folder %>/build/concat-lumious_reports.js',
            },
            dist: {
                src: [
                    '<%= dirs.js_folder %>/useful.js',  // This specific file
                    '<%= dirs.js_folder %>/local-storage.js',  // This specific file
                    '<%= dirs.js_folder %>/settings.js',  // This specific file
                    '<%= dirs.js_folder %>/main.js',  // This specific file
                    '<%= dirs.js_folder %>/analytics.js',  // This specific file
                    '<%= dirs.js_folder %>/messaging.js',  // This specific file
                ],
                dest: '<%= dirs.js_folder %>/build/concat-dist.js',
            },
        },
        // Uglify JS
        uglify: {
            build: {
                src: '<%= dirs.js_folder %>/build/concat-gumby.js',
                src: '<%= dirs.js_folder %>/build/concat-ui_libs.js',
                src: '<%= dirs.js_folder %>/build/concat-ui_vendor.js',
                src: '<%= dirs.js_folder %>/build/concat-reports.js',
                src: '<%= dirs.js_folder %>/build/concat-dist.js',
                // dest: '<%= dirs.js_folder %>/build/production-uglified.js'
                dest: '<%= dirs.production_build_folder %>/all-uglified.js'
            }
        },
        // Image Optimization
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'html/assets/images',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: 'html/production_build/images-optimized'
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
              dest: 'html/production_build/css/screen-with-autoprefixer.css'
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
    grunt.registerTask('default', ['concat','uglify','imagemin','compass:dev','autoprefixer' ]);
    // grunt.registerTask('default', ['concat','compass:dev' ]);
    // grunt.registerTask('default', ['concat','uglify' ]);
    // grunt.registerTask('default', ['concat','uglify','compass:dev' ]);
    // DEV 
    // grunt.registerTask('default', ['concat','compass:dev']);

};