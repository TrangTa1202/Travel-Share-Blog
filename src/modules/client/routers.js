const router = require('express').Router();
const authRoutes = require('./auth/routers');

router.use('/auth', authRoutes);

module.exports = router;
