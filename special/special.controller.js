import Post from "../db/models/post.model.js";
import User from "../db/models/user.model.js";
import Comment from "../db/models/comment.model.js";

export const postAuthor = async (req, res, next) => {
  try {
    const { postId } = req.params;
    console.log(postId);
    console.log("hiiiiiiii");
    const post = await Post.findOne({
      where: {
        id: postId,
      },
      include: {
        model: User,
        attributes: ["id", "userName", "email"],
      },
    });
    if (!post) {
      return next(
        res
          .status(400)
          .json({ status: "failed", message: "No post for this id" })
      );
    }

    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const userPostsComments = async (req, res, next) => {
  try {
    console.log(req.params);
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
      include: {
        model: Post,
        where: { id: req.params.postId },
        include: {
          model: Comment,
        },
      },
    });
    if (!user) {
      return next(
        res
          .status(400)
          .json({ status: "failed", message: "No user or post for this id" })
      );
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
