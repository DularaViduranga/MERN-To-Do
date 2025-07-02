const TaskService = require('../services/TaskServices');

class TaskController {
    async getAllTasks(req,res){
        try{
            const tasks = await TaskService.getAllTasks();
            res.status(200).json(tasks);
        }catch(error){
            res.status(500).json({message: error.message})
        } 
    }
}
module.exports = new TaskController();