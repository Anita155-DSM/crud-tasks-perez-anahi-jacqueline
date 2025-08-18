import { Router } from "express";

import { createTag, assignTagToTask, getTags } from "../controllers/tag.controllers.js";



const routesTag = Router();



routesTag.get("/", getTags);

routesTag.post("/", createTag);

routesTag.post("/assing", assignTagToTask);



export default routesTag;