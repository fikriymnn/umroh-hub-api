const { Op, fn, col } = require('sequelize');
const models = require('../../../models');
// const sequelize = require('../../../config/db');
const dataDashoardAdmin = async () => {
    try {
        const totalJamaah = await models.User.count()
        const totalMitra = await models.Mitra.count()
        const totalPackageUmrohActive = await models.package_umroh.count({ where: { konfirmation_status: true, departure_status: 'departure' } })
        const totalPackageUmrohCompleted = await models.package_umroh.count({ where: { departure_status: 'arrival' } })
        const totalOrder = await models.order.count({ where: { order_status: 'waiting' } })
        const totalNewPackage = await models.package_umroh.count({ where: { konfirmation_status: true, departure_status: 'process' } })
        const totalPackage = totalPackageUmrohActive + totalNewPackage;
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

        const totalJamaahInMonth = await models.User.count({
            where: {
                createdAt: {
                    [Op.between]: [startOfMonth, endOfMonth]
                }
            }
        });

        const totalIncome = totalJamaahInMonth * 1000000;

        return {
            totalJamaah,
            totalMitra,
            totalPackageUmrohActive,
            totalPackageUmrohCompleted,
            totalOrder,
            totalPackage,
            totalIncome
        }
    } catch (error) {
        console.error('Error statistics:', error);
        throw new Error('Gagal mengambil data statistik tahunan');
    }
}

const StatisticPakcage = async () => {
    try {
        const totalJamaah = await models.User.count()
        const totalMitra = await models.Mitra.count()
        const totalPackageUmrohActive = await models.package_umroh.count({ where: { konfirmation_status: true, departure_status: 'departure' } })
        const totalPackageUmrohCompleted = await models.package_umroh.count({ where: { departure_status: 'arrival' } })
        const totalOrder = await models.order.count({ where: { order_status: 'waiting' } })
        const totalNewPackage = await models.package_umroh.count({ where: { konfirmation_status: true, departure_status: 'process' } })
        const totalPackage = totalPackageUmrohActive + totalNewPackage;
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

        const totalJamaahInMonth = await models.User.count({
            where: {
                createdAt: {
                    [Op.between]: [startOfMonth, endOfMonth]
                }
            }
        });

        const totalIncome = totalJamaahInMonth * 1000000;

        return {
            totalJamaah,
            totalMitra,
            totalPackageUmrohActive,
            totalPackageUmrohCompleted,
            totalOrder,
            totalPackage,
            totalIncome
        }
    } catch (error) {
        console.error('Error statistics:', error);
        throw new Error('Gagal mengambil data statistik tahunan');
    }
}

const getYearlyStatistics = async (query) => {
    if (!query.year || isNaN(query.year)) {
        throw new Error('Tahun harus valid.');
    }

    const year = parseInt(query.year, 10);
    const statisticsByMonth = [];

    try {
        for (let month = 1; month <= 12; month++) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0, 23, 59, 59);

            // Hitung transaksi
            const transaksi = await models.order.findOne({
                attributes: [
                    [fn('COUNT', col('id')), 'totalTransaksi'],
                    [fn('SUM', col('subtotal')), 'totalSubTotal']
                ],
                where: {
                    createdAt: { [Op.between]: [startDate, endDate] }
                },
                raw: true
            });

            // Hitung jamaah
            const jamaah = await models.jamaah.findOne({
                attributes: [
                    [fn('COUNT', col('id')), 'totalJamaah']
                ],
                where: {
                    createdAt: { [Op.between]: [startDate, endDate] }
                },
                raw: true
            });

            const totalTransaksi = Number(transaksi?.totalTransaksi) || 0;
            const totalSubTotal = Number(transaksi?.totalSubTotal) || 0;
            const totalJamaah = Number(jamaah?.totalJamaah) || 0;

            const nettoRevenue = totalSubTotal - (totalJamaah * 1000000);

            statisticsByMonth.push({
                month,
                totalTransaksi,
                totalSubTotal,
                totalJamaah,
                nettoRevenue
            });
        }

        return statisticsByMonth;
    } catch (error) {
        console.error('Error in getYearlyStatistics:', error);
        throw new Error(error.message);
    }
};


const getYearlyStatisticsDataPackageOrder = async (query) => {
    if (!query.year || isNaN(query.year)) {
        throw new Error('Tahun harus valid.');
    }

    const year = parseInt(query.year, 10);
    const monthQuery = query.month ? parseInt(query.month, 10) : null;
    const statisticsByMonth = [];

    try {
        let totalNewPackageYear = 0;
        let totalOrdersYear = 0;
        let totalActiveYear = 0;
        let totalPackageReguler = 0;
        let totalPackagePlus = 0;

        // kalau ada query.month → cuma ambil bulan itu
        const months = monthQuery && !isNaN(monthQuery)
            ? [monthQuery]
            : Array.from({ length: 12 }, (_, i) => i + 1);

        for (let month of months) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0, 23, 59, 59);

            const transaksi = await models.order.findOne({
                attributes: [[fn('COUNT', col('id')), 'totalTransactions']],
                where: {
                    createdAt: { [Op.between]: [startDate, endDate] },
                    payment_status: 'paid'
                },
                raw: true,
            });

            const totalTransactions = Number(transaksi?.totalTransactions) || 0;

            const totalPackageNew = await models.package_umroh.count({
                where: {
                    createdAt: { [Op.between]: [startDate, endDate] }
                }
            });

            const totalPackageActive = await models.package_umroh.count({
                where: {
                    package_status: 'active',
                    createdAt: { [Op.lte]: endDate }
                }
            });

            const totalPackagePlusMonth = await models.package_umroh.count({
                where: {
                    departure_status: 'departure',
                    actual_departure_date: { [Op.between]: [startDate, endDate] }
                },
                include: [{ model: models.master_category_departure, where: { category_name: 'Plus' } }],
            });

            const totalPackageRegularMonth = await models.package_umroh.count({
                where: {
                    departure_status: 'departure',
                    actual_departure_date: { [Op.between]: [startDate, endDate] }
                },
                include: [{ model: models.master_category_departure, where: { category_name: 'Regular' } }],
            });

            totalNewPackageYear += totalPackageNew;
            totalOrdersYear += totalTransactions;
            totalActiveYear += totalPackageActive;
            totalPackagePlus += totalPackagePlusMonth;
            totalPackageReguler += totalPackageRegularMonth;

            const totalAll = totalTransactions + totalPackageNew + totalPackageActive;
            const percentage = totalAll > 0 ? {
                activePackage: parseFloat(((totalPackageActive / totalAll) * 100).toFixed(2)),
                newPackage: parseFloat(((totalPackageNew / totalAll) * 100).toFixed(2)),
                orders: parseFloat(((totalTransactions / totalAll) * 100).toFixed(2)),
            } : { activePackage: 0, newPackage: 0, orders: 0 };

            statisticsByMonth.push({
                month,
                totalTransactions,
                totalPackageNew,
                totalPackageActive,
                totalPackagePlusMonth,
                totalPackageRegularMonth,
                percentage,
            });
        }

        // kalau ada monthQuery → return cuma data bulan itu
        if (monthQuery) {
            return {
                year,
                month: monthQuery,
                monthlyStatistics: statisticsByMonth[0], // ambil bulan yg dipilih aja
            };
        }

        // kalau nggak ada monthQuery → return full tahun
        const totalAllYear = totalOrdersYear + totalNewPackageYear + totalActiveYear;
        const summaryPercentage = totalAllYear > 0 ? {
            activePackage: parseFloat(((totalActiveYear / totalAllYear) * 100).toFixed(2)),
            newPackage: parseFloat(((totalNewPackageYear / totalAllYear) * 100).toFixed(2)),
            orders: parseFloat(((totalOrdersYear / totalAllYear) * 100).toFixed(2)),
        } : { activePackage: 0, newPackage: 0, orders: 0 };

        return {
            year,
            month: null,
            monthlyStatistics: statisticsByMonth,
            summary: {
                totalNewPackageYear,
                totalActiveYear,
                totalOrdersYear,
                percentage: summaryPercentage
            }
        };

    } catch (error) {
        console.error('Error in getYearlyStatisticsDataPackageOrder:', error);
        throw new Error('Gagal mengambil data statistik tahunan');
    }
};

module.exports = {
    dataDashoardAdmin,
    getYearlyStatisticsDataPackageOrder,
    getYearlyStatistics
}