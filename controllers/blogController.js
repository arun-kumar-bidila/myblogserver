import express from "express";
import Blog from "../models/blogModel.js";

const uploadBlog = async (req, res) => {
  try {
    const { title, content, imageUrl, posterId, selectedTopics } = req.body;

    const newBlog = new Blog({
      title,
      content,
      imageUrl,
      posterId,
      selectedTopics,
    });

    const blog = await newBlog.save();
    return res.status(200).json({ blog });


  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occ in Blog Uploading" });
  }
};


export {uploadBlog}