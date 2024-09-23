const User = require('../models/userModel');

const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors:errors.array()
            })
        }

        const { name, email, password } = req.body;
        const isExistUser = await User.findOne({ email });
        if(isExistUser){
            return res.status(200).json({
                success: false,
                msg: 'Email is already exist!'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({
            name,
            email,
            password:hashedPassword
        })

        const userData = await user.save();

        return res.status(200).json({
            success: true,
            msg: 'Register Successful!',
            data: userData
        })

    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const GenerateAccessToken = async(user) => {
    const Token = jwt.sign(user, 'secret_token', { expiresIn: "24h" });
    return Token;
}

const loginUser = async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors:errors.array()
            })
        }

        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        if(!userData){
            return res.status(400).json({
                success: false,
                msg: 'Email and Password Is Incorrect'
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, userData.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                msg: 'Email and Password Is Incorrect'
            })
        }

        const accessToken = await GenerateAccessToken({ user: userData })
        
        return res.status(200).json({
            success: true,
            msg: 'Login Successfully',
            accessToken: accessToken,
            tokenType:'Bearer',
            data: userData
        })

    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const getProfile = async(req,res) => {
    try{
        const user_id = req.user._id;
        const userData = await User.findOne({ _id: user_id });
        return res.status(200).json({
            success: true,
            msg: 'Profile Data',
            data: userData
        })
    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getProfile
}