const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {  type: String, default: '' },
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true}, 
    status: { type: String, default: 'Open'},
    assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

module.exports = mongoose.model('Issue', issueSchema);