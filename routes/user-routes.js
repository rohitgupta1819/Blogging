import express from "express";

import { getAllUser, login, signup } from "../controllers/user-controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/", getAllUser);

export default router;