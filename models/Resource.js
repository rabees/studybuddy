const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ResourceSchema = new Schema({
    no:{
        type: Number,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    videoLink: {
        type: String,
        required: true
    },
    group : { type: Schema.Types.ObjectId, ref: 'Group' }
}, { timestamps : { uploadedAt: 'created_at'}});

module.exports = Resource = mongoose.model('resources',  ResourceSchema)
