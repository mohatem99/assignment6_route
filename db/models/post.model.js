import sequelize from "../database.js";
import { DataTypes } from "sequelize";

const Post = sequelize.define("post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  softDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Post;
