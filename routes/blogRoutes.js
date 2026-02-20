import express from "express";
import multer from "multer";
import { getAllBlogs, uploadBlog, uploadBlogImage,getUserBlogs } from "../controllers/blogController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
});

const blogRouter = express.Router();

blogRouter.post(
  "/uploadimage",
  authMiddleware,
  upload.single("image"),
  uploadBlogImage,
);
blogRouter.post("/uploadblog", authMiddleware, uploadBlog);
blogRouter.get("/getallblogs",authMiddleware,getAllBlogs);   
blogRouter.get("/getuserblogs",authMiddleware,getUserBlogs);

export default blogRouter;
