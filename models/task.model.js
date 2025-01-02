const mongoose=require('mongoose')
const {Schema,model}=mongoose

const taskSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['In Progress','Panding','Canceled'],
        default:'Panding'
    },
    new_task:{
        type:Boolean,
        default:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    failed:{
        type:Boolean,
        default:false
    }

})

const Task=model('Task',taskSchema)

module.exports=Task