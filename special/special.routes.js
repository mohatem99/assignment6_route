import express from "express";
import { postAuthor, userPostsComments } from "./special.controller.js";
const router = express.Router();
router.get("/post/:postId", postAuthor);
router.get("/user/:userId/post/:postId/comments", userPostsComments);
export default router;
