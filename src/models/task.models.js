import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User as UserModel } from './user.models.js';

export const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  description: { type: DataTypes.STRING(100), allowNull: false },
  is_completed: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { timestamps: false });

// Relación 1:N con User (uno a muchos) 
Task.belongsTo(UserModel, { foreignKey: "user_id", as: "author" });
UserModel.hasMany(Task, { foreignKey: 'user_id', as: 'tasks' });