const router=require('express').Router()
const authRoutes=require('./auth')
const taskRoutes=require('./task')

router.use('/user/auth',authRoutes)
router.use('/tasks',taskRoutes)

module.exports=router