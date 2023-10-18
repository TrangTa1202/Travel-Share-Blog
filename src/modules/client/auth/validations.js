const { body } = require('express-validator');
const { User } = require('../../../models');

module.exports = {
  checkRegister: [
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('First name is required'),
    body('lastName')
      .trim()
      .notEmpty()
      .withMessage('Last name is required'),
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters')
      .isLength({ max: 20 })
      .withMessage('Username must be at most 20 characters')
      .custom(async (value) => {
        const user = await User.findOne({ username: value });

        if (user) {
          throw new Error('Username already exists');
        }

        return true;
      }),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid')
      .custom(async (value) => {
        const user = await User.findOne({ email: value });

        if (user) {
          throw new Error('Email already exists');
        }

        return true;
      }),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],

  checkLogin: [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Invalid Password'),
  ],

  checkForgotPassword: [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),
  ],

  checkVerifyCode: [
    body('code')
      .trim()
      .notEmpty()
      .withMessage('code is required')
      .isLength({ min: 6, max: 6 })
      .withMessage('Code is invalid'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),
  ],

  checkResetPassword: [
    body('code')
      .trim()
      .notEmpty()
      .withMessage('code is required')
      .isString()
      .withMessage('Code is invalid')
      .isLength({ min: 6, max: 6 })
      .withMessage('Code is invalid'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),
    body('password')
      .trim()
      .isString()
      .withMessage('Password is invalid')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password is invalid'),
  ],
};
