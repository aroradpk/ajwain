const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');

router.post('/projects', auth,  projectController.createProject);
router.get('/projects', auth, projectController.getProjects);
router.get('/projects/:id', auth, projectController.getProjectById);
router.patch('/projects/:id', auth, projectController.updateProject);
router.patch('/projects/:id/members', auth, projectController.addMember);
router.delete('/projects/:id', auth, projectController.deleteProject);

module.exports = router;