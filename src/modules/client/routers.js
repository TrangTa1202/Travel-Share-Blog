const router = require('express').Router();
const authRoutes = require('./auth/routers');
const seedingRoutes = require('./seeding/routers');

router.use('/auth', authRoutes);
router.use('/seeding', seedingRoutes);

module.exports = router;
