import { body, param } from "express-validator";
import { validateResults } from "./validateResults.js";

export const createUserValidator = [
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("email").isEmail().withMessage("Debe ser un email válido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("El password debe tener al menos 6 caracteres"),
  validateResults
];

export const updateUserValidator = [
  param("id").isInt().withMessage("El ID debe ser un número entero"),
  body("email").optional().isEmail().withMessage("Debe ser un email válido"),
  validateResults
];

export const deleteUserValidator = [
  param("id").isInt().withMessage("El ID debe ser un número entero"),
  validateResults
];
