'use strict'
module.exports = (grunt) ->
    require('load-grunt-tasks')(grunt);
    pkg = grunt.file.readJSON('package.json')
    grunt.initConfig(
        pkg: pkg
        watch:
            files: ['portalpc/utility.js']
            tasks: ['copy:someJs']
        copy:
            all:
                files: [
                    expand: true
                    cwd: 'app/portal_pc_new/'
                    src: [
                        [
                            '**'
                        ]
                    ]
                    dest: '<%= pkg.targetFolder %>/<%= pkg.pc_release %>'
                ]
            someJs:
                src:'portalPc/utility.js'
                dest:'../map/tasks/utility.js'
        useminPrepare:
            html: [ 'app/portal_pc_new/index.htm', 'app/portal_pc_new/topic-prod.htm']
            options:
                dest: 'dist/<%= pkg.pc_release %>/'
        usemin:
            html: [ 'dist/<%= pkg.pc_release %>/index.htm', 'dist/<%= pkg.pc_release %>/topic-prod.htm']
        clean:
            dist:
                files: [
                    dot: true
                    src: [
                        'dist/<%= pkg.pc_release %>'
                        'dist/archive/*pc*.zip'
                    ]
                ]
        imagemin:
            options:
                optimizationLevel: 1
            dist:
                files: [
                    expand: true
                    src: ['dist/<%= pkg.pc_release %>/**/*']
                    dest: ''
                ]
        htmlmin:
            usemin:
                expand: true,
                cwd: 'app/portal_pc_new/'
                dest: 'dist/<%= pkg.pc_release %>/',
                src: ['*.{html,htm}']
            dist:
                options:
                    removeComments: true
                    collapseWhitespace: true
                expand: true,
                dest: ''
                src: ['<%= pkg.targetFolder %>/<%= pkg.pc_release %>/**/index.htm']
        'regex-replace':
            correctCode:
                src: ['dist/{,*}*/*.{html,htm}']
                actions: [
                    name: 'correct errors introduced by previous replacement'
                    search: '<script(?:((?!script).)+)arget-script-min\.js.+<\/script>'
                    replace: ''
                    flags: 'g'
                ]
            replaceAjaxParamSpecifiedFile:
                src: [
                    '<%= pkg.targetFolder %>/<%= pkg.pc_release %>/combination.js'
                ]
                actions: [
                    name: 'replace environment param of the specified file'
                    search: 'http\:\/\/testwww\.flynavi\.cn'
                    replace: ''
                ]
            replaceAjaxParam: # specify a target with any name
                src: ['dist/**/*.js']
                actions: [
                    name: 'ajax environment variable'
                    search: 'http\:\/\/testwww\.flynavi\.cn(?=\/admserver)'
                    replace: ''
                    flags: 'g'
                ]
            replaceEnvironment:
                src: ['dist/{,*/}*.htm', 'dist/{,*/}*.js', 'dist/{,*/}*.css', 'dist/{,*/}*.html']
                filter: 'isFile'
                actions: [
                    name: 'code environment variable'
                    search: '(test|verify)?(www\.flynavi\.cn)'
                    replace: '<%= grunt.config("state") %>www\.flynavi\.cn'
                    flags: 'g'
                ]
        compress:
            dist:
                options:
                    archive: "#{pkg.targetFolder}/archive/#{pkg.pc_release}-<%= grunt.config('state') %>-<%= grunt.config('date') %>.zip"
                files: [
                    expand: true
                    src: ['**']
                    dest: ''
                    cwd: '<%= pkg.targetFolder %>/<%= pkg.pc_release %>/'
                ]


    )
    grunt.loadTasks('tasks');

