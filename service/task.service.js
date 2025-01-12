const Task = require("../models/task.model")
const User = require("../models/user.model")

const taskCreateService=async({title,description,published,deadline,assignedTo,userId})=>{
    const task=await Task.create({
        title,
        description,
        published,
        deadline,
        assignedTo
      })
      const taskId=task._id
      const assignedId=assignedTo
      await User.updateOne({_id:userId},{
        $push:{assignedTasks:taskId}
      })
      
      await User.updateOne({_id:assignedId},{
        $push:{assignedTasks:taskId}
      })
      return task;
}

const taskUpdateService=async({title,description,published,deadline,status,new_task,completed,failed,id})=>{
  const updatedTask=await Task.updateOne({_id:id},{
    $set:{
      title,
      description,
      published,
      deadline,
      status,
      new_task,
      completed,
      failed,
    }
  })
  return updatedTask
}

const taskDeleteService=async({id})=>{
  const deletedTask=await Task.deleteOne({_id:id})
  return deletedTask
}

const taskGetAllService=async()=>{
  const tasks=await Task.find()
  return tasks
}

const taskGetByIdService=async({id})=>{
  const task=await Task.findOne({_id:id})
  return task;
}


module.exports={taskCreateService,taskUpdateService,taskDeleteService,taskGetAllService,taskGetByIdService}