const Issue = require('../models/Issue');
const Project = require('../models/Project');

exports.createIssue = async (req, res) => {
    try {
        const project = await Project.findById(req.body.project);
        if (!project) return res.status(400).send({ error: 'Project not found' });
        if (!project.members.includes(req.user._id)){
            return res.status(403).send({error:'User not part of the project'});
        }
        const issue = new Issue({
            ...req.body,
            creator: req.user._id
        });
        await issue.save();
        res.status(201).send({ issue });
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getIssues = async (req, res) => {
    try {
        const issues = await Issue.find({});
        res.send(issues);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getIssueById = async (req, res) => {
    const {id} =  req.params;
    try {
        const issue = await Issue.find(id);
        if (!issue) {
            return res.status(404).send();
        }
        res.send(issue);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.updateIssue = async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'status', 'assignedTo'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'});
    }
    try {
        const issue = await Issue.findById(req.params.id);
        if (!issue){
            return res.status(404).send();
        }
        updates.forEach(update => issue[update] =  req.body[update]);
        await issue.save();
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.deleteIssue = async (req, res) => {
    try {
        const issue = await Issue.findByIdAndDelete(req.params.id);
        if(!issue){
            return res.status(404).send();
        }
        res.send(issue);
    } catch (error) {
        res.status(500).send(error);
    }
}