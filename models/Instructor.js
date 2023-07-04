const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
	role: {
		type: String,
		default: 'instructor',
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
    },
	rating: {
		type: Number,
		default: 0,
	},
	ratingDistribution: {
		type: Array,
		default: []
	}
}, { timestamps : { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = Instructor = mongoose.model('Instructor', instructorSchema);
