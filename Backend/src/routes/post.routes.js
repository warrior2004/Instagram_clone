const express = require("express")
const postRouter = express.Router()

/**
 * POST /api/post [protected]
 * req.body = {caption, image-file}
 */

postRouter.post("/")

module.exports = postRouter