import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Task } from "./task.models.js";
import { Tag } from "./tag.models.js";
// Tabla intermedia
export const TaskTagModel = sequelize.define("Task_Tag", {}, { timestamps: false });
// Relación muchos a muchos entre Task y Tag

// Relaciones muchos a muchos
Task.belongsToMany(Tag, { through: TaskTagModel, foreignKey: "taskId", as: "tags" });
Tag.belongsToMany(Task, { through: TaskTagModel, foreignKey: "tagId", as: "tasks" });
