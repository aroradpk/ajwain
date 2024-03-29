const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.userLogin);

module.exports = router;