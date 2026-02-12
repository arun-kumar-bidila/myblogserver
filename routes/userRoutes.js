import express from "express";
import { signUpUser } from "../controllers/userController.js";

const userRouter=express.Router();

userRouter.post("/signup",signUpUser);


export default userRouter;