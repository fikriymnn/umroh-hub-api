const express = require('express');
const router = express.Router();

router.use('/users', require('./users/user_routes'));
router.use('/mitras', require('./mitra/mitra_routes'));
router.use('/admins', require('./admins/admin_routes'));
router.use('/auth', require('./auth/auth_route'));
module.exports = router;
