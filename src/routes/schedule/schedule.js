// routes/jadwalRoutes.js
const express = require('express');
const router = express.Router();
const { scheduletoday } = require('../../controllers/schedule/schedule_controller');

router.get('/today', scheduletoday);

module.exports = router;
