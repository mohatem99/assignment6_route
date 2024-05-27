import Comment from "../db/models/comment.model.js";

export const addComment = async (req, res, next) => {
  try {
    const { content, postId } = req.body;
    const comment = await Comment.create({
      content,
      postId,
      userId: req.user.id,
    });
    res.status(201).json({
      status: "success",
      data: comment,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const allComments = async (req, res, next) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json({
      status: "success",
      data: comments,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return next(
        res
          .status(400)
          .json({ status: "failed", message: "No comment for this id" })
      );
    }
    res.status(200).json({ status: "success", data: comment });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
export const updateComment = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return next(
        res
          .status(400)
          .json({ status: "failed", message: "No comment for this id" })
      );
    }
    if (comment.userId == req.user.id) {
      comment.content = req.body.content || comment.content;
      await comment.save();
      res.status(200).json({
        status: "success",
        data: comment,
      });
    } else {
      return next(
        res.status(400).json({ status: "failed", message: "unauthorized user" })
      );
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return next(
        res
          .status(400)
          .json({ status: "failed", message: "No comment for this id" })
      );
    }
    if (comment.userId == req.user.id) {
      await comment.destroy();
      res
        .status(200)
        .json({ status: "success", message: "Comment deleted successfully" });
    } else {
      return next(
        res.status(400).json({
          status: "failed",
          message: "you are not allowed to delete",
        })
      );
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
