import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  createTaskForUser
} from '../controllers/task.controllers.js';
import { validator } from '../middlewares/validator.js';
import { createTaskValidator, createTaskForUserValidator, updateTaskValidator, deleteTaskValidator } from '../middlewares/validations/taskValidators.js';

const routerTasks = express.Router();

routerTasks.get('/', getAllTasks);
routerTasks.get('/:id', getTaskById);
routerTasks.post('/', createTaskValidator, validator, createTask);
routerTasks.put('/:id', updateTaskValidator, validator, updateTask);
routerTasks.delete('/:id', deleteTaskValidator, validator, deleteTask);
routerTasks.post('/users/:userId', createTaskForUserValidator, validator, createTaskForUser);

export default routerTasks; 