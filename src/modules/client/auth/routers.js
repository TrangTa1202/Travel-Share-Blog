const router = require('express').Router();

const { Validate } = require('../middleware');
const {
  register, login, forgotPassword, verifyCode, resetPassword,
} = require('./controllers');
const {
  checkRegister, checkLogin, checkForgotPassword, checkVerifyCode, checkResetPassword,
} = require('./validations');

router.post('/register', checkRegister, Validate, register);
router.post('/login', checkLogin, Validate, login);
router.post('/forgot-password', checkForgotPassword, Validate, forgotPassword);
router.post('/verify-code', checkVerifyCode, Validate, verifyCode);
router.put('/reset-password', checkResetPassword, Validate, resetPassword);

module.exports = router;
