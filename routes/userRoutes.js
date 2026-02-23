import express from "express";
import { signUpUser ,loginUser, getUser, changePassword} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter=express.Router();

userRouter.post("/signup",signUpUser);
userRouter.post("/login",loginUser);
userRouter.get("/getuser",authMiddleware,getUser);
userRouter.post("/changepassword",authMiddleware,changePassword);


export default userRouter;