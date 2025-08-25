import { body, param } from "express-validator";
import { User } from "../../models/user.models.js";

export const createUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("El campo name es obligatorio"),
  body("email")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new Error("El email ya está registrado");
      }
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("El password debe tener al menos 6 caracteres"),
];

export const updateUserValidator = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("El usuario no existe");
      }
    }),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Debe ser un email válido"),
];

export const deleteUserValidator = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("El usuario no existe");
      }
    }),
];
