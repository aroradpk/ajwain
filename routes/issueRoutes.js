const express= require('express');
const router = express.Router();
const issueController = require( '../controllers/issueController') ;
const auth = require('../middleware/auth');

router.post('/issues', auth, issueController.createIssue);
router.get('/issues/', auth, issueController.getIssues);
router.get('/issues/:id', auth, issueController.getIssueById);
router.patch('/issues/:id', auth, issueController.updateIssue);
router.delete('/issues/:id', auth, issueController.deleteIssue);

module.exports = router;