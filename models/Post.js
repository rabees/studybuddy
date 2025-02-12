const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Instructor'
    },
    text: {
        type: String,
        required: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'Student'
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'Instructor'
            },
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'Student'
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'Instructor'
            },
            text: {
                type: String,
                required: true
            },
            first_name: {
                type: String
            },
            last_name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);
