const mongoose=require('mongoose')
const {Schema,model}=mongoose

const userSchema=new Schema({
    username:{
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['employee','admin','super_admin'],
        default:'employee'
    },
    assignedTasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Task'
        }
    ]
})

const User=model('User',userSchema)

module.exports=User