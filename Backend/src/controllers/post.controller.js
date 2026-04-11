const postModel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs");


const imagekit = new Imagekit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
});
async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: req.file.buffer.toString("base64"),
    folder: "/Instagram/",
    fileName: "Test",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getPostController(req, res) {

  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Post fetched successfully",
    posts,
  });
}

async function getPostDetails(req, res) {
  const userId = req.user.id;
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
