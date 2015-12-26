var gulp = require('gulp'),
    Taskman = require('./tasks/Taskman'),
    config = require('./gulpfile.config');

Taskman.create(gulp, __dirname, config).load('./tasks/**/*-task.js');
