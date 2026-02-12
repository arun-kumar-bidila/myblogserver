import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors"
import userRouter from "./routes/userRoutes.js";



//CONFIG
dotenv.config();
connectDB();
const app=express();

//MIDDLEWARES
app.use(express.json());
app.use(cors());


//TEST API
app.get("/test",(req,res)=>{
    return res.send("Server is healthy");
});



//ROUTES
app.use("/api/auth",userRouter);

app.listen(process.env.PORT,"0.0.0.0",()=>{
    console.log("Server Running Successfully on port :"+process.env.PORT);
})