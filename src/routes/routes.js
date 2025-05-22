

const express = require('express');
const router = express.Router();

router.use("/", require('../routes/master_category_departure/master_category_departure_router'))
router.use("/", require('../routes/master_location/master_location_routes'))
router.use("/", require('../routes/master_type_departure/master_type_departure_rotes'))
router.use("/", require('../routes/package_umroh/package_umroh_rotes'))
router.use('/users', require('./users/user_routes'));
router.use('/mitras', require('./mitra/mitra_routes'));
router.use('/admins', require('./admins/admin_routes'));
router.use('/auth', require('./auth/auth_route'));

module.exports = router;