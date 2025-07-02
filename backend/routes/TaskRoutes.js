const express = require('express');
const TaskController = require('../controllers/TaskController');
const router = express.Router();

router.get('/',TaskController.getAllTasks.bind(TaskController))


module.exports = router;