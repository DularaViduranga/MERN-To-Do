const Task = require('../models/TaskModels');

class TaskRepo{
    async getAllTasks(){
        return await Task.find();
    }
}

module.exports = new TaskRepo();