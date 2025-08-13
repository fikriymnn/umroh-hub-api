// controllers/jadwalController.js
const {  getscheduletoday } = require('../../services/schedule/schedule');

async function getScheduleTodayController(req, res) {
  try {
    const { idPackage } = req.params;
    const result = await getscheduletoday(idPackage);

    res.status(200).json({
      success: true,
      status_code: 200,
      message: 'Jadwal hari ini berhasil diambil',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status_code: 500,
      message: error.message
    });
  }
}

module.exports = { getScheduleTodayController };
