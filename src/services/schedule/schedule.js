// services/jadwalService.js
const { package_umroh, package_schedule, detail_activity } = require('../../models');

async function getscheduletoday() {
  const today = new Date();

  const packages = await package_umroh.findAll({
    include: [
      {
        model: package_schedule,
        include: [
          {
            model: detail_activity,
            where: { is_active: true },
            required: false
          }
        ]
      }
    ]
  });

  const hasil = packages.map(pkg => {
    const departureDate = new Date(pkg.date_departure);
    const returnDate = new Date(pkg.date_return);

    const diffDays = Math.floor((today - departureDate) / (1000 * 60 * 60 * 24));

    let scheduleHariIni = null;
    if (diffDays >= 0 && diffDays < pkg.package_schedules.length) {
      scheduleHariIni = pkg.package_schedules[diffDays];
    }

    return {
      package_name: pkg.package_name,
      date_departure: pkg.date_departure,
      date_return: pkg.date_return,
      hari_ke: diffDays >= 0 ? diffDays + 1 : null,
      schedule: scheduleHariIni
    };
  });

  return hasil;
}

module.exports = { getscheduletoday };
