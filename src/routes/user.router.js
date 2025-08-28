import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.controllers.js';
import { createUserValidator, updateUserValidator, deleteUserValidator } from '../middlewares/validations/userValidators.js';
import { validator } from '../middlewares/validator.js';

const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', createUserValidator, validator, createUser);
userRoutes.put('/:id', updateUserValidator, validator, updateUser);
userRoutes.delete('/:id', deleteUserValidator, validator, deleteUser);

export default userRoutes;
