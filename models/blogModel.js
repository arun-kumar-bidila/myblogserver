import mongoose from "mongoose";

const blogSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    posterId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    selectedTopics:[
        {
            type:String,

        }
    ],
    updated:{
        type:Date,
        default:Date.now

    }

},{timestamps:true});


const Blog=mongoose.model("blog",blogSchema);

export default Blog;