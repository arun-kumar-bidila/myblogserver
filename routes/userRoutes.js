import express from "express";
import { signUpUser ,loginUser} from "../controllers/userController.js";

const userRouter=express.Router();

userRouter.post("/signup",signUpUser);
userRouter.post("/login",loginUser);


export default userRouter;