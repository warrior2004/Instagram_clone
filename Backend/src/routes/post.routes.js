const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middleware/auth.middleware");

/**
 * POST /api/post/ [protected]
 * req.body = {caption, image-file}
 */

postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

/**
 * GET /api/post/ [protected]
 */

postRouter.get("/", identifyUser, postController.getPostController);

/**
 * GET /api/post/details/:postid
 * - Returns a detail about sepcific post with the id, also checks whether the post belongs to that specific user
 */

postRouter.get("/details/:postId", identifyUser, postController.getPostDetails);

module.exports = postRouter;
