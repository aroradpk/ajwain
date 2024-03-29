const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    members : [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        role: {
            type: String,
            enum: ['admin', 'developer', 'viewer'],
            default: 'developer'
        }
    }]
}, {timestamps: true});

module.exports = mongoose.model('Project', projectSchema);