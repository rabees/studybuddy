const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
	role: {
		type: String,
		default: 'admin',
	},
	first_name: {
        type: String,
        // lowercase: true,
    },
    last_name: {
        type: String,
        // lowercase: true,
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

module.exports = Admin = mongoose.model('Admin', adminSchema);
