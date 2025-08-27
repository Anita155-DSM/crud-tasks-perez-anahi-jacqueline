import { Task } from "../models/task.models.js";
import { User } from "../models/user.models.js";
import { Tag } from "../models/tag.models.js";

// trae todas las tareas con su autor y tags
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: User, as: "author", attributes: ["id", "username", "email"] },
        { model: Tag, as: "tags", through: { attributes: [] } },
      ],
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "error al obtener las tareas", error: error.message });
  }
};

// trae una tarea puntual con su autor y tags
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [
        { model: User, as: "author", attributes: ["id", "username", "email"] },
        { model: Tag, as: "tags", through: { attributes: [] } },
      ],
    });

    if (!task) return res.status(404).json({ message: "tarea no encontrada" });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "error al obtener la tarea", error: error.message });
  }
};

// crear una nueva tarea
export const createTask = async (req, res) => {
  try {
    const { title, description, is_completed } = req.body;

    const newTask = await Task.create({
      title,
      description,
      is_completed: is_completed ?? false,
    });

    res.status(201).json({ message: "tarea creada con éxito!!", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "error al crear la tarea... lo sentimos :(", error: error.message });
  }
};

// actualizar una tarea existente
export const updateTask = async (req, res) => {
  try {
    const { title, description, is_completed } = req.body;
    const task = await Task.findByPk(req.params.id);

    if (!task) return res.status(404).json({ message: "tarea no encontrada... intentalo de nuevo" });

    // actualizar solo los campos enviados
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (is_completed !== undefined) updateData.is_completed = is_completed;

    await task.update(updateData);
    res.status(200).json({ message: "tarea actualizada con éxito", task });
  } catch (error) {
    res.status(500).json({ message: "error al actualizar la tarea", error: error.message });
  }
};

// eliminar una tarea (eliminación lógica)
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "tarea no encontrada" });

    await task.destroy(); // con paranoid:true hará soft delete
    res.status(200).json({ message: "tarea eliminada con éxito (lógica)" });
  } catch (error) {
    res.status(500).json({ message: "error al eliminar la tarea, lo sentimos :(", error: error.message });
  }
};

// crear una tarea asociada a un usuario
export const createTaskForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description, is_completed } = req.body;

    const newTask = await Task.create({
      title,
      description,
      is_completed: is_completed ?? false,
      user_id: userId, // FK en la tabla tasks
    });

    res.status(201).json({ message: "Tarea creada y asociada al usuario con éxito", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea para el usuario", error: error.message });
  }
};
