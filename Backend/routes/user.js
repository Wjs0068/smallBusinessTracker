import express from "express";
import { createUser, loginUser } from "../controllers/user.js";

const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);

export default router;
