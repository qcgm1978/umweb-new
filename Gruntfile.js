module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= props.license %> */\n',

        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    linkNatives:true,
                    //attributesEmit:true,
                    //exclude:'',
                    paths: ['js/','room/script/'],
                    //themedir: 'path/to/custom/theme/',
                    outdir: 'docs/docs/'
                    //'no-sort':''
                }
            }
        },
        plato: {
            your_task: {
                options : {
                    //jshint : false,
                    switchcase : false,
                    //exclude: /(\.min)|(jquery.*)/    // excludes source files finishing with ".min.js"
                },
                files: {
                    'docs/code-complexity-report': ['js/**/*.js','room/script/**/*.js','!js/libraries/**/*.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-readme');
    grunt.loadNpmTasks('grunt-plato');
    //grunt.registerTask('doc', ['yuidoc']);

};

