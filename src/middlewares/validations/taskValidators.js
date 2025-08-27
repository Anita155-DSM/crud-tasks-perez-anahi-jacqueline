import { body, param } from "express-validator";
import { Task } from "../../models/task.models.js";

//validador para crear una tarea para un usuario especifico
export const createTaskValidator = [
  body("title")
    .notEmpty()
    .withMessage("El campo title es obligatorio!!")
    .custom(async (value) => {
      const task = await Task.findOne({ where: { title: value } });
      if (task) {
        throw new Error("El título ya está en uso");
      }
    }),
  body("title")
    .isLength({ max: 100 })
    .withMessage("El título debe tener menos de 100 caracters"),
  body("description")
    .notEmpty()
    .withMessage("El campo description es obligatorio!!"),
    body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("El campo isComplete debe ser un valor booleano"),
];
