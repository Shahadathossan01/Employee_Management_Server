const { registerController, loginController } = require('../controller/auth')
const {body,validationResult}=require('express-validator')
const { registerValidationRules, loginValidationRules } = require('../middleware/express_validation')
const router=require('express').Router()

router.post('/register',registerValidationRules,registerController)
router.post('/login',loginValidationRules,loginController)

module.exports=router