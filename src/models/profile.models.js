import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ProfileModel = sequelize.define("profile", {
  biografia: { type: DataTypes.STRING(100), allowNull: true },
  avatar: { type: DataTypes.STRING(100), allowNull: true },
  phone: { type: DataTypes.STRING(15), allowNull: true }
}, { timestamps: false });

// no definimos belongsTo aquí
