import { Router } from "express";

import { createProfile, getProfiles } from "../controllers/profile.controllers.js";

const routesProfile = Router();
routesProfile.post("/", createProfile);
routesProfile.get("/", getProfiles);

export default routesProfile;