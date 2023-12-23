import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    userRef:{
        type: String,
        required: true,
    }
}, {timestamps: true});

const BlogPost = mongoose.model('BlogPost', blogSchema);

export default BlogPost;