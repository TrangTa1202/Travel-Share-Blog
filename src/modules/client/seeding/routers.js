const router = require('express').Router();

const { fakeUsers, fakePosts, fakeComments } = require('./controllers');

router.get('/fake-users', fakeUsers);

router.get('/fake-posts', fakePosts);

router.get('/fake-comments', fakeComments);

module.exports = router;
