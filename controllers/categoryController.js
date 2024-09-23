const { validationResult } = require('express-validator');
const Category = require('../models/categoryModels');

const AddCategory = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors:errors.array()
            })
        }

        const { category_name } = req.body;
        const isExists = await Category.findOne({
            name:{
                $regex: category_name,
                $options: 'i'
            }
        })
        if(isExists){
            return res.status(200).json({
                success: false,
                msg: 'Category already exists',
            });
        }
        const category = new Category({
            name: category_name
        })
        const categoryData = await category.save();
        return res.status(200).json({
            success: true,
            msg: 'Category Created Successfully!',
            data: categoryData
        })

    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
};

const GetCategory = async (req,res) => {
    try{
        const category = await Category.find({});
        return res.status(200).json({
            success: true,
            msg: 'Categories Fetched Successfully!',
            data: category
        })
    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const DeleteCategory = async(req,res) => {
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

        const categoryid = await Category.findOne({_id:id});
        if(!categoryid){
            return res.status(400).json({
                success: false,
                msg: 'Category Id Not Exist!!'
            }) 
        }

        await Category.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            success: true,
            msg: 'Category Deleted Successfully!'
        })
    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const UpdateCategory = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors:errors.array()
            })
        }

        const { id, category_name } = req.body;
        const isExist = await Category.findOne({ _id: id });
        if(!isExist){
            return res.status(400).json({
                success: false,
                msg: "Category id not found!"
            })
        }

        const isExists = await Category.findOne({
            _id:{ $ne:id },
            name:{
                $regex: category_name,
                $options: 'i'
            }
        })
        if(isExists){
            return res.status(200).json({
                success: false,
                msg: 'This Category name is already exist!'
            });
        }

        const UpdateData = await Category.findByIdAndUpdate({_id:id},{
            $set:{
                name: category_name
            }
        },{new:true});
        
        return res.status(200).json({
            success: true,
            msg: "Category Update Successfully!",
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
    AddCategory,
    GetCategory,
    DeleteCategory,
    UpdateCategory
}