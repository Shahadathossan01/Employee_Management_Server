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
    rowPassword:{
        type:String
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