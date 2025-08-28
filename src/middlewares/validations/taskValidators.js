import { body, param } from "express-validator";
import { Task } from "../../models/task.models.js";
import { User } from "../../models/user.models.js";

// validador para crear una tarea
export const createTaskValidator = [
  body("title")
    .notEmpty()
    .withMessage("El campo title es obligatorio!!")
    .isLength({ max: 100 })
    .withMessage("El título debe tener menos de 100 caracteres")
    .custom(async (value) => {
      const task = await Task.findOne({ where: { title: value } });
      if (task) throw new Error("El título ya está en uso");
    }),
  body("description").notEmpty().withMessage("El campo description es obligatorio!!"),
  body("is_completed").optional().isBoolean().withMessage("El campo is_completed debe ser un valor booleano"),
];

// validador para actualizar una tarea existente
export const updateTaskValidator = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const task = await Task.findByPk(value);
      if (!task) throw new Error("La tarea no existe");
    }),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("El campo title no puede estar vacío")
    .isLength({ max: 100 })
    .withMessage("El título debe tener menos de 100 caracteres")
    .custom(async (value, { req }) => {
      const task = await Task.findOne({ where: { title: value } });
      if (task && task.id !== parseInt(req.params.id, 10)) {
        throw new Error("El título ya está en uso");
      }
    }), //ordeno mejor el codigo general
  body("description").optional().notEmpty().withMessage("El campo description no puede estar vacío"),
  body("is_completed").optional().isBoolean().withMessage("El campo is_completed debe ser un valor booleano"),
];

// validador para eliminar una tarea
export const deleteTaskValidator = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const task = await Task.findByPk(value);
      if (!task) throw new Error("La tarea no existe");
    }),
];

// validador para crear una tarea para un usuario especifico
export const createTaskForUserValidator = [
  param("userId")
    .isInt()
    .withMessage("El userId debe ser un número entero")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) throw new Error("El usuario no existe");
    }),
  body("title")
    .notEmpty()
    .withMessage("El campo title es obligatorio!!")
    .isLength({ max: 100 })
    .withMessage("El título debe tener menos de 100 caracteres")
    .custom(async (value) => {
      const task = await Task.findOne({ where: { title: value } });
      if (task) throw new Error("El título ya está en uso");
    }),
  body("description").notEmpty().withMessage("El campo description es obligatorio!!"),
  body("is_completed").optional().isBoolean().withMessage("El campo is_completed debe ser un valor booleano"),
];