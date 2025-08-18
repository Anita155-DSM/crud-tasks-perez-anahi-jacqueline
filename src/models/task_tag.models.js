import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Tabla intermedia
export const TaskTagModel = sequelize.define("Task_Tag", {}, { timestamps: false });
// Relación muchos a muchos entre Task y Tag