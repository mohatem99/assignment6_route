import Post from "../db/models/post.model.js";

export const allPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json({ status: "success", data: posts });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const addPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content, author: req.user.id });
    res.status(201).json({
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

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
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

export const deletPost = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return next(
        res
          .status(400)
          .json({ status: "failed", message: "No post for this id" })
      );
    }
    if (post.author == req.user.id) {
      post.softDeleted = true;
      await post.save();
    }

    res.status(200).json({
      status: "success",
      message: "post soft deleted Succesfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return next(
        res
          .status(400)
          .json({ status: "failed", message: "No post for this id" })
      );
    }

    if (post.author == req.user.id) {
      post.title = req.body.title || post.title;
      post.content = req.body.content || post.body;
      await post.save();

      res.status(200).json({ status: "success", data: post });
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
