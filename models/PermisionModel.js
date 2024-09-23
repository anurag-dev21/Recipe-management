const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
    permision_name:{
        type:String,
        required:true
    },
    is_default:{
        type:Number,
        default:0
    }
});

module.exports = mongoose.model('Permision', PermissionSchema);