const router = require('express').Router();

const { Validate } = require('../middleware');
const { getPosts } = require('./controllers');
const { checkGetPosts } = require('./validations');

router.get('/', checkGetPosts, Validate, getPosts);

module.exports = router;
