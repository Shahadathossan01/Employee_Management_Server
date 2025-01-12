const {validationResult}=require('express-validator')
const { registerService, loginService } = require('../service/auth')

const registerController=async(req,res,next)=>{
    const {username,email,password,role}=req.body
    const {errors}=validationResult(req)
    if(errors.length !=0){
      return res.status(400).json(errors)
    }
    try{
      const user=await registerService({username,email,password,role})
      return res.status(201).json({message:'user created successfully',user})
    }catch(error){
      next(error)
    }
  }

const loginController=async(req,res,next)=>{
    const {email,password}=req.body
    const {errors}=validationResult(req)
    if(errors.length !=0){
      return res.status(400).json(errors)
    }
    try{
      const {token,user}=await loginService({email,password})
      return res.status(200).json({message:'Login Successfully',token,user})
    }catch(e){
      next(e)
    }
  
  }

module.exports={registerController,loginController}