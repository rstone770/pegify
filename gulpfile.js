var TaskMan = require('./tasks/TaskMan'),
    config = require('./gulpfile.config');

TaskMan.create(__dirname, config).load('./tasks/**/*-task.js');
