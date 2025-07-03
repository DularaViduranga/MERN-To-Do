const express = require('express');
const TaskController = require('../controllers/TaskController');
const router = express.Router();

router.get('/',TaskController.getAllTasks.bind(TaskController));
router.post('/',TaskController.createTask.bind(TaskController));

// Update task by ID
router.put('/:id', TaskController.updateTask.bind(TaskController));

router.delete('/:id', TaskController.deleteTask.bind(TaskController));
module.exports = router;