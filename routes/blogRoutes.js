import express from "express";
import multer from "multer";
import { uploadBlog, uploadBlogImage } from "../controllers/blogController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
});

const blogRouter = express.Router();

blogRouter.post("/blogimage", upload.single("image"), uploadBlogImage);
blogRouter.post("/blog",authMiddleware,uploadBlog);

export default blogRouter;
