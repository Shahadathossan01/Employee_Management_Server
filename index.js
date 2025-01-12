require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT ||3000
const cors=require('cors')
const connectDB = require('./db')
app.use(cors())
app.use(express.json())
const routes=require('./routes')
const User = require('./models/user.model')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('./middleware/authenticate')
const error = require('./utils/error')
app.get('/health', (req,res,next) => {
  try{
    res.status(200).json({message:'Health is Good For This Route'})
  }catch(error){
    next(error)
  }
})

app.use(routes)

app.post('/user/google',async(req,res,next)=>{
  const {username,email}=req.body
  try{
    const user=await User.findOne({email})
    if(user){
      const token=jwt.sign(user._doc,`${process.env.JWT_KEY}`)
      delete user._doc.password
      return res.status(200).json({message:'Login Successfully',token,user})
    }else{
      const generatePawword=Math.random().toString(36).slice(-8)
      const salt=bcrypt.genSaltSync(10)
      const hash=bcrypt.hashSync(generatePawword,salt)
      const newUser=new User({
        username:{
          firstname:username.firstname,
        },
        email,
        password:hash,
        rowPassword:generatePawword
      })
      await newUser.save()
      const token=jwt.sign(newUser._doc,`${process.env.JWT_KEY}`)
      delete newUser._doc.password
      return res.status(200).json({message:'Login Successfully',token,user:newUser})
    }
  }catch(error){
    next(error)
  }
})

app.get('/users',authenticate,async(req,res,next)=>{
  try{
    const users=await User.find()
    if(!users){
      throw error('User not found',500)
    }
    return res.status(200).json(users)
  }catch(error){
    next(error)
  }
})

app.get('/user/:id',authenticate,async(req,res,next)=>{
  try{
    const {id}=req.params
    const validUserId=req.user.id
    if(id !=validUserId) return
    const user=await User.findById(id).populate('assignedTasks')
    if(!user){
      throw error('User not found',400)
    }
    return res.status(200).json(user)
  }catch(error){
    next(error)
  }
})

app.delete('/users/:id',authenticate,async(req,res,next)=>{
  const {id}=req.params
  try{
    const deletedUser=await User.deleteOne({_id:id})
    return res.status(200).json({message:"deleted successfully"})
  }catch(error){
    next(error)
  }
})

app.use((error,_req,res,_next)=>{
  console.log(error)
  const message=error.message?error.message:'Server Error Occurred'
  const status=error.status?error.status:500;
  res.status(status).json({message})
})

connectDB(`${process.env.DATABASE_URL}employee_management`)
.then(()=>{
  console.log('Database is Connected')
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
})
.catch((e)=>console.log(e))
