// services/jadwalService.js
const { package_umroh, package_schedule, detail_activity } = require('../../models');
const { Op } = require('sequelize');

async function getscheduletoday(idPackage) {
  const today = new Date();

  // Ambil package dan departure date
  const pkg = await package_umroh.findByPk(idPackage, {
    include: [{
      model: package_schedule,
      include: [{
        model: detail_activity,
        where: { is_active: true },
        required: false
      }]
    }]
  });

  if (!pkg) throw new Error('Paket tidak ditemukan');

  // Hitung hari ke-berapa dari tanggal berangkat
  const departureDate = new Date(pkg.date_departure);
  const diffDays = Math.floor((today - departureDate) / (1000 * 60 * 60 * 24));

  // Ambil schedule sesuai index hari
  const scheduleToday = pkg.package_schedules[diffDays] || null;

  return {
    package: pkg.package_name,
    hariKe: diffDays + 1,
    schedule: scheduleToday
  };
}

module.exports = { getscheduletoday };
