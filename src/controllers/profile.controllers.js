import { ProfileModel } from "../models/profile.models.js";
import { User } from "../models/user.models.js";

export const createProfile = async (req, res) => {
  try {
    const { user_id, bio, avatar, phone } = req.body;

    // Validar usuario existente
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si ya tiene perfil
    const existingProfile = await ProfileModel.findOne({ where: { user_id } });
    if (existingProfile) {
      return res.status(400).json({ message: "El usuario ya tiene un perfil" });
    }

    const profile = await ProfileModel.create({ user_id, bio, avatar, phone });
    res.status(201).json({ message: "Perfil creado con éxito", profile });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el perfil", error: error.message });
  }
};

export const getProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.findAll({
      include: [{ model: UserModel, as: "user", attributes: ["id", "username", "email"] }],
    });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfiles", error: error.message });
  }
};
