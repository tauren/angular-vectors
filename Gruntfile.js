module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      src: '.',
      dist: 'dist'
    },

    clean: {
      dist: ['<%= config.dist %>']
    },

    connect: {
      options: {
        port: 9090,
        livereload: 35829,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.src %>'
          ]
        }
      },
    },

    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.src %>/**/{,*/}*.html',
          '<%= config.dist %>/css/{,*/}*.css',
          '<%= config.src %>/lib/**/{,*/}*.js',
          // '<%= config.dist %>/fonts/{,*/}*',
          // '<%= config.dist %>/images/{,*/}*'
        ]
      },
      compass: {
        files: [
          '<%= config.src %>/styles/**/*.{scss,sass}'
        ],
        tasks: ['compass']
      }
    },

    // copy: {
    //   html: {
    //     expand: true,
    //     cwd: '<%= config.src %>',
    //     src: ['*.html'],
    //     dest: '<%= config.dist %>'
    //   },
    //   js: {
    //     expand: true,
    //     cwd: '<%= config.src %>',
    //     src: ['*.js'],
    //     dest: '<%= config.dist %>/js'
    //   },
    //   images: {
    //     expand: true,
    //     cwd: '<%= config.src %>/images',
    //     src: ['*'],
    //     dest: '<%= config.dist %>/images'
    //   }
    // },

    compass: {
      common: {
        options: {
          sassDir: ['<%= config.src %>/styles'],
          cssDir: ['<%= config.dist %>/css'],
          environment: 'development'
        }
      }
    }
  });

  // Load the plugin
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['connect:livereload', 'compass', 'watch']);

};
