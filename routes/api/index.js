const router = require("express").Router();
const uploadRoutes = require('./uploads');

router.use('/uploads', uploadRoutes);

module.exports = router;