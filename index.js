import express from "express";
import cors from "cors";
import connectionDb from "./db/connection.js";

import userRoutes from "./users/users.router.js";
import postRoutes from "./posts/posts.routes.js";
import commentsRoutes from "./comments/comments.routes.js";
import specialRoutes from "./special/special.routes.js";

connectionDb();

app.use(cors());
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello assignment 6" });
});
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentsRoutes);
app.use("/special", specialRoutes);
app.use("*", (req, res, next) => {
  res.status(404).json({ msg: "404 resource not found" });
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
