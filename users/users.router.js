import express from "express";
import { signup, login, allUsers } from "./users.controller.js";
import { protect } from "../users/users.controller.js";
const router = express.Router();
router.get("/", protect, allUsers);
router.post("/signup", signup);
router.post("/login", login);
export default router;
