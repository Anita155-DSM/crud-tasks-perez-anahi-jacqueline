import { Task } from "../models/task.models.js";
import { Tag } from "../models/tag.models.js";

// Asignar un tag a una tarea
export const assignTagToTask = async (req, res) => {
  try {
    const { taskId, tagId } = req.body;

    const task = await Task.findByPk(taskId);
    const tag = await Tag.findByPk(tagId);

    if (!task || !tag) {
      return res.status(404).json({ message: "Tarea o Tag no encontrado" });
    }

    await task.addTag(tag);
    res.status(200).json({ message: "Tag asignado a la tarea con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al asignar el tag", error: error.message });
  }
};

// Remover un tag de una tarea
export const removeTagFromTask = async (req, res) => {
  try {
    const { taskId, tagId } = req.body;

    const task = await Task.findByPk(taskId);
    const tag = await Tag.findByPk(tagId);

    if (!task || !tag) {
      return res.status(404).json({ message: "Tarea o Tag no encontrado" });
    }

    await task.removeTag(tag);
    res.status(200).json({ message: "Tag removido de la tarea con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al remover el tag", error: error.message });
  }
};
