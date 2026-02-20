import express from "express";
import Blog from "../models/blogModel.js";

import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const uploadBlogImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).json({ message: "Image is missing" });
    }
    console.log(process.env.CLOUD_API_KEY);
    console.log(req.file.path);
    const result = await cloudinary.uploader.upload(req.file.path);
    if (!result) {
      return res.status(500).json({ message: "Failed to Upload" });
    }
    fs.unlinkSync(req.file.path);

    return res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to Upload Image" });
  }
};

const uploadBlog = async (req, res) => {
  try {
    const { title, content, imageUrl, posterId, selectedTopics, updated } =
      req.body;

    const newBlog = new Blog({
      title,
      content,
      imageUrl,
      posterId,
      selectedTopics,
      updated,
    });

    const blog = await newBlog.save();
    return res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occ in Blog Uploading" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ posterId: req.userId });

    return res.status(200).json({blogs});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch your blogs" });
  }
};

export { uploadBlog, uploadBlogImage, getAllBlogs ,getUserBlogs };
