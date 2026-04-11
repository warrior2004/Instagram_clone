const postModel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs");

const imagekit = new Imagekit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
});
async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: req.file.buffer.toString("base64"),
    fileName: "Test",
  });

  res.send(file);
}

module.exports = {
  createPostController,
};
