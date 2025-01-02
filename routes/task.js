const router=require('express').Router()
const { taskCreateController, taskUpdateController, taskDeleteController, taskGetAllController, taskGetByIdController } = require('../controller/task.controller')
const authenticate = require('../middleware/authenticate')
const { createTaskValidationRules, updateTaskValidationRules } = require('../middleware/express_validation')

router.post('',authenticate,createTaskValidationRules,taskCreateController)
router.patch('/:id',authenticate,updateTaskValidationRules,taskUpdateController)
router.delete('/:id',authenticate,taskDeleteController)
router.get('',authenticate,taskGetAllController)
router.get('/:id',authenticate,taskGetByIdController)

module.exports=router