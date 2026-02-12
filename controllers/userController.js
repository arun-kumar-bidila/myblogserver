import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createToken=(id)=>{

    return jwt.sign({id},process.env.SECRET);

}

const signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user=await newUser.save();

    const token=createToken(user._id);

    return res.status(201).json({user,accessToken:token});



  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Error occured in acc creation"});
  }
};


export {signUpUser};