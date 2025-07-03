const TaskRepo = require('../repositories/TaskRepo');

class TaskServices {
    async getAllTasks(){
        return await TaskRepo.getAllTasks();
    }
    async createTask(taskData){
        return await TaskRepo.createTask(taskData)
    }

    async updateTask(id, taskData) {
        return await TaskRepo.updateTask(id, taskData);
    }

    async deleteTask(id) {
        return await TaskRepo.deleteTask(id);
    }
}

module.exports = new TaskServices()