import { Router } from "express";

import { createTag, getTags } from "../controllers/tag.controllers.js";


const routesTag = Router();



routesTag.get("/", getTags);

routesTag.post("/", createTag);


export default routesTag;