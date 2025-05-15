const router = require("express").Router();

router.use("/", require('../routes/master_category_departure/master_category_departure_router'))
router.use("/", require('../routes/master_location/master_location_routes'))
router.use("/", require('../routes/master_type_departure/master_type_departure_rotes'))

module.exports = router;