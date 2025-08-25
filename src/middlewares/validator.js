import { validationResult } from "express-validator";
//esto es un middleware que valida los resultados de las validaciones definidas en userValidators.js (lo llamamos middleware "generico" digamos)
export const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Errores de validación",
      errors: errors.mapped()
    });
  }
  next();
};