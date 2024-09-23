const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

const AddUser = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors:errors.array()
            })
        }

        const { name, email } = req.body;
        const isExists = await User.findOne({
            email
        })
        if(isExists){
            return res.status(400).json({
                success: false,
                msg: 'Email Is already is exits',
            })
        }

        const password = randomstring.generate(6);
        const HasgPassword = await bcrypt.hash(password, 8);

        var obj = {
            name,
            email,
            password: HasgPassword
        }
        if(req.body.role && req.body.role == 1){
            return res.status(400).json({
                success: false,
                msg: 'You Can not create admin',
            })
        }
        else if(req.body.role){
            obj.role = req.body.role;
        } 

        const user = new User(obj);
        const userData = await user.save();
        console.log(password);
        
        return res.status(200).json({
            success: true,
            msg: 'User Created Successfully',
            data: userData
        })

    }
    catch(errors){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

module.exports = {
    AddUser
}