const Project = require('../models/Project');
const User = require('../models/User');

exports.createProject = async (req, res) => {
    const project = new Project({
        ...req.body,
        createdBy: req.user._id,
        members: [{ user: req.user._id, role: 'admin' }]
    })
    try {
        await project.save();
        res.status(201).send(project);
    } catch (error) {
        res.status(404).send(error);
    }
}

exports.getProjects = async (req, res)=>{
    try {
        const projects = await Project.find({members: req.user._id});
        res.send(projects);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getProjectById = async (req, res)=> {
    try {
        const project = await Project.findById(req.params.id);
        if(!project){
            return res.status(404).send();
        }
        res.send(project);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.updateProject = async (req, res)=> {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates'})
    }
    try {
        const project = await  Project.findByIdAndUpdate(req.params.id);
        if(!project){
            return res.status(404).send();
        }
        updates.forEach(update => project[update]= req.body[update]);
        await project.save();
        res.send(project);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if(!project){
            return res.status(404).send();
        }
        res.send(project);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.addMember = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if(!project){
            return res.status(404).send({error: 'Project not found'});
        }
        const requesterIsAdmin = project.members.some(member => member.user.equals(req.user._id) && member.role === 'admin');
        if (!requesterIsAdmin){
            return res.status(403).send({error: 'Only admins can add members'})
        }
        const {userId, role} = req.body;
        if(!userId || !role){
            return res.status(400).send({error:'UserId and role are required to add a new member'} );
        }
        const userToAdd = User.findById(userId);
        if(!userToAdd){
            return  res.status(400).send({ error: "The user does not exist" });
        }
        const isAlreadyMember = project.members.some(member => member.user.equals(userId));
        if(isAlreadyMember){
            return res.status(400).send({ error: "This user is already a member of the project" });
        }
        project.members.push({user: userId, role});
        await project.save();
        res.status(200).send({message: 'New member added successfully', project})
    } catch (error) {
        res.status(500).send(error);
    }
}