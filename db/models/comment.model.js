import sequelize from "../database.js";
import { DataTypes } from "sequelize";

const Comment = sequelize.define("comment", {
  content: { type: DataTypes.STRING, allowNull: false },
});

export default Comment;
