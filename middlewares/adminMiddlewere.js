const { registerUser } = require("../controllers/authcontroller");

const onlyAdminAccess = async(req,res,next) => {
    try{
        if(req.user.role != 1){
            return res.status(400).json({
                success: false,
                msg: 'you Have not a access to this route'
            })
        }
    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: 'something went wrong'
        })
    }
    return next();
}

module.exports = {
    onlyAdminAccess
}