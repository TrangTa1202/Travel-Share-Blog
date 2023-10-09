const router = require('express').Router();

const { register } = require('./controllers');

router.get('/register', register);

module.exports = router;
