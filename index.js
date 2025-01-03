require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT ||3000
const cors=require('cors')
const connectDB = require('./db')
app.use(cors())
app.use(express.json())
const routes=require('./routes')

app.get('/health', (req,res,next) => {
  try{
    res.status(200).json({message:'Health is Good For This Route'})
  }catch(error){
    next(error)
  }
})

app.use(routes)

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