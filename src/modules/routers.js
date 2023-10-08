const router = require('express').Router();

const clientRoutes = require('./client/routers');

router.use('/api/v1.0/client', clientRoutes);

module.exports = router;
