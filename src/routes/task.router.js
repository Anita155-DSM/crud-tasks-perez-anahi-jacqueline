import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  createTaskForUser
} from '../controllers/task.controllers.js';

const routerTasks = express.Router();

routerTasks.get('/', getAllTasks);
routerTasks.get('/:id', getTaskById);
routerTasks.post('/', createTask);
routerTasks.put('/:id', updateTask);
routerTasks.delete('/:id', deleteTask);
routerTasks.post('/users/:userId', createTaskForUser);

export default routerTasks; 