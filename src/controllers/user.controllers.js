import { User } from "../models/user.models.js";
import { Task } from "../models/task.models.js";
import { matchedData } from "express-validator";
import { ProfileModel } from "../models/profile.models.js";

// trae todos los usuarios con sus tareas y perfil
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Task,
          attributes: ["id", "title", "description", "is_completed"],
          as: "tasks" // coincide con User.hasMany(Task, { as: "tasks" })
        },
        {
          model: ProfileModel,
          attributes: ["biografia", "avatar", "phone"],
          as: "profile"
        }
      ]
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "error al obtener los usuarios", error: error.message });
  }
};

// trae un usuario puntual con sus tareas y perfil
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Task,
          attributes: ["id", "title", "description", "is_completed"],
          as: "tasks" // coincide con la relación
        },
        {
          model: ProfileModel,
          attributes: ["biografia", "avatar", "phone"],
          as: "profile"
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "error al obtener el usuario", error: error.message });
  }
};

// esta funcion crea un nuevo usuario
// las validaciones (campos obligatorios, unicidad de email, etc.) ahora están en el middleware
export const createUser = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    const newUser = await User.create(data);
    res.status(201).json({ message: 'usuario creado con éxito!!!', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'error al crear el usuario...' });
  }
};

// esta función actualiza un usuario existente
// la validación de existencia y unicidad de email se maneja en el middleware
export const updateUser = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'usuario no encontrado... intenta con uno valido' });
    }

    await user.update(data);
    res.status(200).json({ message: 'usuario actualizado con éxito', user });
  } catch (error) {
    res.status(500).json({ message: 'error al actualizar el usuario' });
  }
};

// esto contiene la logica para eliminar un usuario
// si el modelo tiene paranoid:true hace soft delete automáticamente
// si mantenés is_deleted, cambiar destroy() por update({ is_deleted: true })
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'usuario no encontrado' });
    }

    await user.destroy();
    res.status(200).json({ message: 'usuario eliminado con éxito (lógicamente*)' });
   
  } catch (error) {
    res.status(500).json({ message: 'error al eliminar el usuario' });
  }
};
