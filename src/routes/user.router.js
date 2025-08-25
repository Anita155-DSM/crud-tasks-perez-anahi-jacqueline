import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.controllers.js';
import { createUserValidator, updateUserValidator, deleteUserValidator } from '../middlewares/userValidators.js';

const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', createUserValidator, createUser);
userRoutes.put('/:id', updateUserValidator, updateUser);
userRoutes.delete('/:id', deleteUserValidator, deleteUser);

export default userRoutes;
