const User = require("../models/user.model")
const error = require("../utils/error")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerService=async({username,email,password,role})=>{
    try{
        let user=await User.findOne({email})
        if(user){
          throw error('User already exists',400)
        }
        user=new User({
          username:{
            firstname:username.firstname,
            lastname:username.lastname
          },
          email:email,
          password:password,
          role:role
        })
        const salt=bcrypt.genSaltSync(10)
        const hash=bcrypt.hashSync(password,salt)
        user.password=hash
        await user.save()
        return user
    }catch(e){
        console.log(e)
        throw error()
    }
   
}

const loginService=async({email,password})=>{
    try{
        const user=await User.findOne({email})
    if(!user){
        throw error('Invalid Credential',400)
      }
      const isMatch=await bcrypt.compare(password,user.password)
      if(!isMatch){
        throw error('Invalid Credential',400)
      }
      delete user._doc.password
  
      const token=jwt.sign(user._doc,`${process.env.JWT_KEY}`)
      return {token,user}
    }catch(e){
        console.log(r)
        throw error()
    }
}
module.exports={registerService,loginService}