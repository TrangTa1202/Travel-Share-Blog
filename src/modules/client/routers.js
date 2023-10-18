const router = require('express').Router();
const authRoutes = require('./auth/routers');
const seedingRoutes = require('./seeding/routers');
const { ErrorHandler } = require('./middleware');

router.use('/auth', authRoutes);
router.use('/seeding', seedingRoutes);

router.use(ErrorHandler);

module.exports = router;
