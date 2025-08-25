import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { ProfileModel } from './profile.models.js';

export const User = sequelize.define('User', {
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(100), allowNull: false }
}, 
{ 
  paranoid: true,
  timestamps: false
 });


// Solo aquí definimos la relación 1:1 (uno a uno)
User.hasOne(ProfileModel, { foreignKey: 'user_id', as: 'profile' });
ProfileModel.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
