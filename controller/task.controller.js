const { validationResult } = require("express-validator")
const { taskCreateService, taskUpdateService, taskDeleteService, taskGetAllService, taskGetByIdService } = require("../service/task.service")
const error = require("../utils/error")

const taskCreateController=async(req,res,next)=>{
    const {title,description,deadline,assignedTo}=req.body
    const {errors}=validationResult(req)
    const userId=req.user._id
    if(errors.length !=0){
      return res.status(400).json(errors)
    }
    try{
      const task=await taskCreateService({title,description,deadline,assignedTo,userId})
      if(!task){
        throw error('task not create',500)
      }
      return res.status(200).json(task)
    }catch(e){
      next(e)
    }
  
  }

const taskUpdateController=async(req,res,next)=>{
  const {id}=req.params
  const {title,description,deadline,status,new_task,completed,failed}=req.body
  const {errors}=validationResult(req)
  if(errors.length !=0){
    return res.status(200).json(errors)
  }
  try{
    const updatedTask=await taskUpdateService({title,description,deadline,status,new_task,completed,failed,id})
    if(updatedTask.matchedCount==0){
      return res.status(400).json({message:'Not update!!'})
    }
    return res.status(200).json({message:'updated successfully!'})
    
  }catch(e){
    next(e)
  }
  
}

const taskDeleteController=async(req,res,next)=>{
  const {id}=req.params;
  try{
    const deletedTask=await taskDeleteService({id})
    if(deletedTask.deletedCount==0){
      return res.status(400).json({message:'Task not found'})
    }
    return res.status(200).json({message:'deleted successfully'})
  }catch(e){
    next(e)
  }
}

const taskGetAllController=async(req,res,next)=>{
  try{
    const tasks=await taskGetAllService()
    if(!tasks){
      throw error('Tasks not found',400)
    }
    return res.status(200).json(tasks)
  }catch(e){
    next(e)
  }
}

const taskGetByIdController=async(req,res,next)=>{
  const {id}=req.params
  try{
    const task=await taskGetByIdService({id})
    if(!task){
      throw error('No task found',400)
    }
    return res.status(200).json(task)
  }catch(e){
    next(e)
  }
}
  module.exports={taskCreateController,taskUpdateController,taskDeleteController,taskGetAllController,taskGetByIdController}