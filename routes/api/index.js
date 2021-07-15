const router = require("express").Router();
const uploadRoutes = require('./uploads');
const upRoutes = require('./upload');
const imageRoutes = require('./images')

router.use('/uploads', uploadRoutes);
router.use('/upload', upRoutes);
router.use('/images', imageRoutes);

module.exports = router;