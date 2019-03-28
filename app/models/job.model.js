const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    communication: { type: String },
    location: { type: String },
    type: { type: String },
    benefits: { type: [String] },
    createdDate: { type: Date, default: Date.now },
    cuid: { type: 'String', required: true },
});

module.exports = mongoose.model('job', schema);