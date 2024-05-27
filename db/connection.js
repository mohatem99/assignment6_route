import User from "./models/user.model.js";
import Post from "./models/post.model.js";
import Comment from "./models/comment.model.js";
import sequelize from "./database.js";

User.hasMany(Post, { foreignKey: "author" });
Post.belongsTo(User, { foreignKey: "author" });

Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });
const connectionDb = async () => {
  return await sequelize
    .sync({ alter: false, force: false })
    .then(() => {
      console.log("connection database initialized successfully");
    })
    .catch((err) => {
      console.log({ msg: "connection database fail", err });
    });
};

export default connectionDb;
