const TaskService = require('../services/TaskServices');

class TaskController {
    async getAllTasks(req,res){
        try{
            const tasks = await TaskService.getAllTasks();
            res.status(200).json(tasks);
        }catch(error){
            res.status(500).json({message: error.message});
        } 
    }

    async createTask (req,res) {
        try{
            const task = await TaskService.createTask(req.body);
            res.status(201).json(task);
        }catch(error){
            res.status(500).json({message: error.message});
        }
    }

    async updateTask(req, res) {
        try {
            const { id } = req.params;
            const updatedTask = await TaskService.updateTask(id, req.body);
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteTask(req, res) {
        try {
            const { id } = req.params;
            await TaskService.deleteTask(id);
            res.status(204).send(); // No content
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
}
}



module.exports = new TaskController();