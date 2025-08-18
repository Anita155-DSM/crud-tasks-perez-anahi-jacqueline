import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Tag = sequelize.define("tag", {
  name: { 
    type: DataTypes.STRING(50),
    allowNull: false, 
    unique: true 
  }
}, { timestamps: false });

// No defino Task.belongsToMany aquí para evitar ciclo, sino entra en ciclo