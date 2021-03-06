const path = require('path');
const router = require('express').Router();
const authRoutes = require('./auth');

router.use ('/auth/user', authRoutes);

router.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;