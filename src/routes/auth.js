import express from "express";

import { login, signup, signupTeammate } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/signup/teammate", signupTeammate);

export default router;
