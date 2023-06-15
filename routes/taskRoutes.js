const express = require('express');
const { getTask, createTask, deleteTask, updateTask } = require('../controllers/taskController');
const auth = require('../middle/auth');
const taskRouter = express.Router();


taskRouter.get('/', auth ,getTask)
taskRouter.get('/cat', auth ,getTask)
taskRouter.post('/', auth,createTask)

taskRouter.delete('/:id',auth, deleteTask)
taskRouter.put('/:id',auth, updateTask)

module.exports = taskRouter