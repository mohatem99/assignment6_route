import express from "express";
import {
  allPosts,
  addPost,
  getPost,
  deletPost,
  updatePost,
} from "./posts.controller.js";
import { protect } from "../users/users.controller.js";
let router = express.Router();

router.get("/", allPosts);
router.post("/", protect, addPost);
router.get("/:id", getPost);
router.delete("/:id", protect, deletPost);
router.put("/:id", protect, updatePost);

export default router;
