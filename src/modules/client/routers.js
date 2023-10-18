const router = require('express').Router();
const authRoutes = require('./auth/routers');
const seedingRoutes = require('./seeding/routers');
const postRoutes = require('./post/routers');
const { ErrorHandler, Guard } = require('./middleware');

router.use('/auth', authRoutes);
router.use('/seeding', seedingRoutes);

router.use(Guard);
router.use('/post', postRoutes);
router.use(ErrorHandler);

module.exports = router;
