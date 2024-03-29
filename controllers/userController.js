const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const {userName, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({userName, email, password: hashedPassword});
        await user.save();
        const token = jwt.sign({id: user._id.toString()}, process.env.JWT_SECRET);
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.userLogin = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user){
            return res.status(404).send('Unable to login');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).send('Unable to login');
        }
        const token = jwt.sign({id: user._id.toString()}, process.env.JWT_SECRET);
        res.send({user,token});  
    } catch (error) {
        res.status(500).send(error)
    }
}