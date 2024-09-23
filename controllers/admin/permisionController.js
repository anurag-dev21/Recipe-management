const { validationResult } = require('express-validator');
const Permision = require('../../models/PermisionModel');

const AddPermision = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors:errors.array()
            })
        }

        const { permision_name } = req.body;
        const isExist = await Permision.findOne({ 
            permision_name:{
                $regex: permision_name,
                $options: 'i'
            } 
        });
        if(isExist){
            return res.status(400).json({
                success: false,
                msg: "Permission Name Already Exist!"
            })
        }

        var obj = { permision_name }
        if(req.body.default){
            obj.is_default = parent(req.body.default);
        }
        const permision = new Permision(obj);
        const newPermision = await permision.save();
        return res.status(200).json({
            success: true,
            msg: "Permission Added Successfully!",
            data: newPermision
        })

    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const GetPermision = async(req,res) => {
    try{
        const permision = await Permision.find({});
        return res.status(200).json({
            success: true,
            msg: 'Permision Fetched Successfully!',
            data: permision
        })
    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const DeletePermision = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors:errors.array()
            })
        }
        const { id } = req.body;
        await Permision.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            success: true,
            msg: 'Permision Deleted Successfully!'
        })
    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const UpdatePermision = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors:errors.array()
            })
        }

        const { id, permision_name } = req.body;
        const isExist = await Permision.findOne({ _id: id });
        if(!isExist){
            return res.status(400).json({
                success: false,
                msg: "Permission id not found!"
            })
        }

        const isNameAssigned = await Permision.findOne({
            _id: {$ne: id},
            permision_name:{
                $regex: permision_name,
                $options: 'i'
            } 
        });
        if(isNameAssigned){
            return res.status(400).json({
                success: false,
                msg: "Permission name is already assigned with another permision!"
            })
        }

        var UpdateObject = { permision_name }
        if(req.body.default != null){
            UpdateObject.is_default = parseInt(req.body.default);
        }

        const UpdateData = await Permision.findByIdAndUpdate({ _id: id },{
            $set: UpdateObject
        }, {new: true});

        return res.status(200).json({
            success: true,
            msg: "Permission Update Successfully!",
            data: UpdateData
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
    AddPermision,
    GetPermision,
    DeletePermision,
    UpdatePermision
}