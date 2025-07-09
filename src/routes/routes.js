

const express = require('express');
const router = express.Router();

router.use("/", require('../routes/master_category_departure/master_category_departure_router'))
router.use("/", require('../routes/master_location/master_location_routes'))
router.use("/", require('../routes/master_type_departure/master_type_departure_rotes'))
router.use("/", require('../routes/package_umroh/package_umroh_rotes'))
router.use("/", require('../routes/orders/orders_routes'))
router.use("/", require('../routes/review/review_routes'))
router.use("/", require('../routes/data_management/mitra/mitra_data'))
router.use('/users', require('./users/user_routes'));
router.use('/mitras', require('./mitra/mitra_routes'));
router.use('/admins', require('./admins/admin_routes'));
router.use('/hotels', require('../routes/master_hotel/master_hotel_router'));
router.use('/auth', require('./auth/auth_route'));
router.use('/post', require('./forum/post_route'));
router.use('/comment', require('./forum/comment_route'));
router.use('/reply', require('./forum/reply_route'));
router.use('/react', require('./forum/reaction_route'));

module.exports = router;