const express = require("express");
const authenticate = require("../../../middlewares/auth");
const { getDataDashboardMitra, getDataStatisticMitra } = require("../../../controllers/data_manajemen/mitra/mitra_data");
const router = express.Router();

router.get('/getDataSahboardMitra', authenticate(['mitra']), getDataDashboardMitra)
router.get('/sttMitra/:year', authenticate(['mitra']), getDataStatisticMitra)

module.exports = router;