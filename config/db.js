import mongoose from "mongoose";


const connectDB=async()=>{
    try {

        const conn=await mongoose.connect(process.env.DB);
        console.log("DB connection Successful")
        
    } catch (error) {
        console.log("DB connection failure");
        console.log(error.message);
        process.exit(1);
        
    }
}

export default connectDB;