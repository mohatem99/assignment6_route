import express from "express";

import {
  allComments,
  addComment,
  getComment,
  updateComment,
  deleteComment,
} from "./comments.controller.js";
import { protect } from "../users/users.controller.js";
let router = express.Router();

router.post("/", protect, addComment);
router.get("/", allComments);
router.get("/:id", getComment);
router.put("/:id", protect, updateComment);
router.delete("/:id", protect, deleteComment);
export default router;
