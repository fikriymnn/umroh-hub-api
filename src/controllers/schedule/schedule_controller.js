// controllers/jadwalController.js
const { getscheduletoday } = require('../../services/schedule/schedule');

async function scheduletoday(req, res) {
  try {
    const data = await getscheduletoday();
    res.status(200).json({
      status_code: 200,
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      status_code: 500,
      success: false,
      message: error.message
    });
  }
}

module.exports = { scheduletoday };
