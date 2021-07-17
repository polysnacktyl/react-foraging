const router = require("express").Router();
const upRoutes = require('./upload');
const uploadsRoutes = require('./uploads');

router.use('/upload', upRoutes);

router.use('/uploads', uploadsRoutes);

module.exports = router;