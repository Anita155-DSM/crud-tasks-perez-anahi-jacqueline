import { Task } from "../models/task.models.js";
import { User } from "../models/user.models.js";
import { Tag } from "../models/tag.models.js";

// trae todas las tareas con su autor y tags
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "email"]
        },
        {
          model: Tag,
          as: "tags",
          through: { attributes: [] }
        }
      ]
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "error al obtener las tareas" });
  }
};

// trae una tarea puntual con su autor y tags
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "email"]
        },
        {
          model: Tag,
          as: "tags",
          through: { attributes: [] }
        }
      ]
    });

    if (!task) {
      return res.status(404).json({ message: "tarea no encontrada" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "error al obtener la tarea" });
  }
};

// crear una nueva tarea, esto contiene las validaciones: título y descripción no pueden ser nulos, título debe ser único
export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    // validaciones generales
    if (!title || !description) {
      return res.status(400).json({ message: 'faltan campos obligatorios, vuelve a intentarlo' });
    }

    if (title.length > 100 || description.length > 100) {
      return res.status(400).json({ message: 'los campos no deben superar los 100 caracteres, intentalo de nuevo' });
    }

    const existingTask = await Task.findOne({ where: { title } });
    if (existingTask) {
      return res.status(400).json({ message: 'ya existe una tarea con ese título, prueba con un titulo valido' });
    }

    const newTask = await Task.create({
      title,
      description,
      isComplete: isComplete ?? false
    });

    res.status(201).json({ message: 'tarea creada con éxito!!', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'error al crear la tarea... lo sentimos :(' });
  }
};

// esto contiene la logica para actualizar una tarea existente
export const updateTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'tarea no encontrada... intentalo de nuevo' });
    }

    // verificar unicidad del título si lo cambia, debe ser único
    if (title && title !== task.title) {
      const existingTitle = await Task.findOne({ where: { title } });
      if (existingTitle) {
        return res.status(400).json({ message: 'ya existe una tarea con ese título, intenta con otro distinto' });
      }
    }

    await task.update({ title, description, isComplete });
    res.status(200).json({ message: 'tarea actualizada con éxito', task });
  } catch (error) {
    res.status(500).json({ message: 'error al actualizar la tarea' });
  }
};

// logica para eliminar una tarea
// verifica si la tarea existe y la elimina
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'tarea no encontrada' });
    }

    await task.destroy();
    res.status(200).json({ message: 'tarea eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'rrror al eliminar la tarea, lo sentimos :(' });
  }
};