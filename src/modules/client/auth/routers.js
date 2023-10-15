const router = require('express').Router();

const { validate } = require('../../../helpers');
const { register } = require('./controllers');
const { checkRegister } = require('./validations');

router.get('/register', checkRegister, validate, register);

module.exports = router;
