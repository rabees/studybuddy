const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const StudentSchema = new Schema({
    role: {
        type: String,
        default: "student"
    },
    first_name: {
        type: String,
        // lowercase: true,
    },
    last_name: {
        type: String,
        // lowercase: true,
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps : { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = Student = mongoose.model('Student', StudentSchema);
