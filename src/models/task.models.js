import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User as UserModel } from './user.models.js';
import { Tag } from './tag.models.js';
import { TaskTagModel } from './task_tag.models.js';

export const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  description: { type: DataTypes.STRING(100), allowNull: false },
  is_completed: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { timestamps: false });

// Relación 1:N con User (uno a muchos) 
Task.belongsTo(UserModel, { foreignKey: "user_id", as: "author" });
UserModel.hasMany(Task, { foreignKey: 'user_id' });

// Relación N:M (muchos a mucjos) con Tag a través de TaskTag
Task.belongsToMany(Tag, { through: TaskTagModel, foreignKey: 'task_id', as: 'tags' });
Tag.belongsToMany(Task, { through: TaskTagModel, foreignKey: 'tag_id', as: 'tasks' });
