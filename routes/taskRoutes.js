const express = require('express');
const { getTask, createTask, deleteTask, updateTask,catByTask } = require('../controllers/taskController');
const auth = require('../middle/auth');
const taskRouter = express.Router();


taskRouter.get('/', auth ,getTask)
// taskRouter.get('/cat', auth ,getTask)
taskRouter.post('/', auth,createTask)
taskRouter.post('/catByTask',catByTask)

taskRouter.delete('/:id',auth, deleteTask)
taskRouter.put('/:id',auth, updateTask)

module.exports = taskRouter