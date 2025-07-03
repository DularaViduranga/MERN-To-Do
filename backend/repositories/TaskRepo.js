const Task = require('../models/TaskModels');

class TaskRepo{
    async getAllTasks(){
        return await Task.find();
    }

    async createTask(taskData){
        return await Task.create(taskData);
    }

    async updateTask(id, taskData) {
        return await Task.findByIdAndUpdate(id, taskData, { new: true });
    }

    async deleteTask(id) {
        return await Task.findByIdAndDelete(id);
    }
}

module.exports = new TaskRepo();