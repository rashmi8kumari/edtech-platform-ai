const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register User
exports.register = async(req,res)=>{
    const { name, email, password, preferredLanguage} = req.body;
    try{
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword, preferredLanguage});

        res.status(201).json({message: 'User registered successfully'});
    } catch(err){
        res.status(500).json({error: err.message});
    }
};


//Login User
exports.login = async (req,res) =>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'Invalid email or password'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid eamil or password'});

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {
           expiresIn: '7d',
        });
        res.json({token, user: {name: user.name, email:user.email}});
    } catch(err){
        res.status(500).json({error: err.message});
    }
};