const postModel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new Imagekit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
});
async function createPostController(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Token not provided, Unauthorized access",
    });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }
  const file = await imagekit.files.upload({
    file: req.file.buffer.toString("base64"),
    folder: "/Instagram/",
    fileName: "Test",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getPostController(req, res) {
  const token = req.cookies.token;
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const userId = decoded.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Post fetched successfully",
    posts,
  });
}

async function getPostDetails(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "UnAuthorized Access",
    });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }

  const userId = decoded.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  return res.status(200).json({
    message: "Post fetched successfully",
    post,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetails,
};
