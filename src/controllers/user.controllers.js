import { User } from "../models/user.models.js";
import { Task } from "../models/task.models.js";
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
// las validaciones son las sigueintes: nombre, email y password no pueden ser nulos, email debe ser único
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // aqui estan las validaciones básicas
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'faltan campos obligatorios, completa todos los campos de ser posible' });
    }
    if (name.length > 100 || email.length > 100 || password.length > 100) {
      return res.status(400).json({ message: 'los campos no deben superar los 100 caracteres, intentalo de nuevo' });
    }

    // esto verificar la unicidad del email (si ya existe un usuario con ese email)
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'el email ya está registrado, intenta con otro email' });
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).json({ message: 'usuario creado con éxito!!!', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'error al crear el usuario...' });
  }
};

// esta función actualiza un usuario existente
export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'usuario no encontrado... intenta con uno valido' });
    }

    // verificar unicidad del nuevo email (si cambia)
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: 'el email ya está registrado por otro usuario' });
      }
    }

    await user.update({ name, email, password });
    res.status(200).json({ message: 'usuario actualizado con éxito', user });
  } catch (error) {
    res.status(500).json({ message: 'error al actualizar el usuario' });
  }
};

// esto contiene la logica para eliminar un usuario
// verifica si el usuario existe y lo elimina
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'usuario no encontrado' });
    }

    await user.update({ is_deleted: true });
    res.status(200).json({ message: "usuario eliminado (lógicament)" });
   
  } catch (error) {
    res.status(500).json({ message: 'error al eliminar el usuario' });
  }
};
