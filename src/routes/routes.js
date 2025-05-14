const express = require('express');
const router = express.Router();

router.use('/users', require('./users/user_routes'));
router.use('/mitras', require('./mitra/mitra_routes'));
router.use('/admins', require('./admins/admin_routes'));

module.exports = router;
