const TaskRepo = require('../repositories/TaskRepo');

class TaskServices {
    async getAllTasks(){
        return await TaskRepo.getAllTasks();
    }
}

module.exports = new TaskServices()