const {body, check}=require('express-validator')

const registerValidationRules=[
  body('username.firstname')
    .isString()
    .withMessage('Firstname must be a string')
    .notEmpty()
    .withMessage('firstname is required'),
  body('username.lastname')
    .isString()
    .withMessage('lastname must be a string')
    .notEmpty()
    .withMessage('lastname is required'),
  body('email')
    .isEmail()
    .withMessage('Email must be valid')
    .notEmpty()
    .withMessage('Email is required'),
  body('password')
    .isLength({min:6})
    .withMessage('password must be at least 6 characters long')
    .notEmpty()
    .withMessage('password is required'),
]
const loginValidationRules=[
  body('email')
    .isEmail()
    .withMessage('Email must be valid')
    .notEmpty()
    .withMessage('Email is required'),
  body('password')
    .isLength({min:6})
    .withMessage('password must be at least 6 characters long')
    .notEmpty()
    .withMessage('password is required'),
]
const createTaskValidationRules=[
    body('title')
      .isString()
      .withMessage('title mush be a string'),
    body('description')
      .isString()
      .withMessage('description must be a string'),
    body('deadline')
      .notEmpty()
      .withMessage('Deadline is required.')
      .isISO8601()
      .withMessage('Deadline must be a valid ISO 8601 date.')
      .custom((value) => {
        if (new Date(value) < new Date()) {
          throw new Error('Deadline must be a future date.');
        }
        return true;
      }),
    body('published')
      .notEmpty()
      .withMessage('published is required.')
      .isISO8601()
      .withMessage('Deadline must be a valid ISO 8601 date.')
]
const updateTaskValidationRules=[
    check('title')
      .optional()
      .isString()
      .withMessage('title mush be a string'),
    check('description')
      .optional()
      .isString()
      .withMessage('description must be a string'),
    check('deadline')
      .optional()
      .isISO8601()
      .withMessage('Deadline must be a valid ISO 8601 date.')
      .custom((value) => {
        if (new Date(value) < new Date()) {
          throw new Error('Deadline must be a future date.');
        }
        return true;
        }),
    check('status')
        .optional()
        .isString()
        .withMessage('status must be a string'),
    check('new')
        .optional()
        .isBoolean()
        .withMessage('new must be a boolean'),
    check('completed')
        .optional()
        .isBoolean()
        .withMessage('completed must be a boolean'),
    check('failed')
        .optional()
        .isBoolean()
        .withMessage('failed must be a boolean')
]

module.exports={createTaskValidationRules,updateTaskValidationRules,registerValidationRules,loginValidationRules}