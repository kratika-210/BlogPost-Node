const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blogpost = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });


const BlogPost=mongoose.model('blogpost',blogpost,'Blogposts');

module.exports=BlogPost;