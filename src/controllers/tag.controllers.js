import { Tag } from "../models/tag.models.js";
import { Task } from "../models/task.models.js";

export const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    // Evitar duplicados
    const existing = await Tag.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({ message: "El tag ya existe" });
    }

    const tag = await Tag.create({ name });
    res.status(201).json({ message: "Tag creado con éxito", tag });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el tag", error: error.message });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Task, as: "tasks", attributes: ["id", "title", "description"] }],
    });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tags", error: error.message });
  }
};

export const assignTagToTask = async (req, res) => {
  try {
    const { taskId, tagId } = req.body;

    const task = await Task.findByPk(taskId);
    const tag = await Tag.findByPk(tagId);

    if (!task || !tag) {
      return res.status(404).json({ message: "Tarea o Tag no encontrado" });
    }

    await task.addTag(tag);
    res.json({ message: "Tag asignado a la tarea con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al asignar el tag", error: error.message });
  }
};
