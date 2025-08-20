import { Tag } from "../models/tag.models.js";
import { Task } from "../models/task.models.js";

// crear un nuevo tag, validando que no exista ya
export const createTag = async (req, res) => {
  try {
    const { name } = req.body;

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
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tags", error: error.message });
  }
};
//aca elimine assing to task cosa de que quede exclusivamente en task_tag.controllers.js para relacionar M:N desde la tabla intermedia