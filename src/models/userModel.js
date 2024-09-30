import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username:{
    type:String,
    required:String,
    unique:true,
  },
  email:{
    type:String,
    required:[true,"Please provide an email" ],
    unique:true,
  },
  password:{
    type:String,
    required:true,
    unique:[true,"your password should be unique"],
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  forgotPasswordToken:String,
  forgotPasswordTokenExpiry:Date,
  verifyToken:String,
  verifyTokenExpiry:Date,
});

export  const User = mongoose.models.users || mongoose.model("users", userSchema);
