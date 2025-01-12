const jwt = require('jsonwebtoken');
const error = require('../utils/error');
const User = require('../models/user.model');

const authenticate=async(req,res,next)=>{
    try{
        let token=req.headers.authorization
        if(!token){
            throw error('Token no found',401)
        }
        token=token.split(' ')[1]
        const decodedToken=jwt.verify(token,`${process.env.JWT_KEY}`)
        const id=decodedToken?.user?decodedToken.user._id:decodedToken._id
        const user=await User.findById(id)
        if(!user){
            throw error('Unauthorized',401)
        }

        req.user=user
        next()

    }catch(e){
        console.log(e)
        throw error('Invalid Token',400)
    }
}

module.exports=authenticate