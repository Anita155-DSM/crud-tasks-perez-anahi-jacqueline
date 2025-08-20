import { Router } from "express";
import { assignTagToTask, removeTagFromTask } from "../controllers/task_tag.controllers.js";

const routerTaskTag = Router();
//rutas para asignar y remover tags de tareas, es mejor asi sugerido por el profe
routerTaskTag.post('/assign', assignTagToTask);
routerTaskTag.post('/remove', removeTagFromTask);

export default routerTaskTag;