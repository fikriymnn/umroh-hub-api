// routes/jadwalRoutes.js
const express = require('express');
const router = express.Router();
const { getScheduleTodayController } = require('../../controllers/schedule/schedule_controller');

router.get('/:idPackage/today', getScheduleTodayController);

module.exports = router;
