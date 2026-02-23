import mongoose from "mongoose";

const pendingUserSchema=new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,  
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp:{
      type:String,
     
    },
    otpExpiry:{
     type:Date,
    
    },
  },
  { timestamps: true },

);

const PendingUser= mongoose.model("pendinguser",pendingUserSchema);

export default PendingUser;