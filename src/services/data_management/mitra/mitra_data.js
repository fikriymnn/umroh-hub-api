const { Op, fn, col } = require('sequelize');
const models = require('../../../models');
const sequelize = require('../../../config/db');
const dataDashboardMitra = async (id_mitra) => {
    // try {
    const allPackage = await models.package_umroh.count({ where: { id_mitra } });

    const packageActive = await models.package_umroh.count({
        where: { id_mitra, package_status: 'active' }
    });

    const order = await models.order.count({ where: { id_mitra, order_status: 'confirmed' } });

    const packagePlus = await models.package_umroh.count({
        where: { id_mitra },
        include: [
            { model: models.master_category_departure, where: { category_name: "Regular" } }
        ]
    });

    const packageRegular = await models.package_umroh.count({
        include: [
            { model: models.master_category_departure, where: { category_name: "Plus" } }
        ]
    });

    const allJamaah = await models.jamaah.count({
        include: [{
            model: models.order, as: 'order',
            where: { id_mitra, order_status: 'confirmed' }
        }]
    });

    const now = new Date();
    const thisMonth = now.getMonth() + 1;
    const thisYear = now.getFullYear();

    const totalRevenue = await models.order.sum('subtotal', {
        where: {
            id_mitra,
            payment_status: 'paid',
            order_status: 'confirmed',
            [Op.and]: [
                fn('MONTH', col('createdAt')), thisMonth,
                fn('YEAR', col('createdAt')), thisYear
            ]
        }
    });

    const nettoRevenue = totalRevenue - (allJamaah * 1000000);

    return {
        allPackage,
        packageActive,
        order,
        packagePlus,
        packageRegular,
        allJamaah,
        totalRevenueThisMonth: nettoRevenue || 0,
        thisMonth
    };
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error('Gagal mengambil data dashboard mitra.');
}
// };

const getYearlyStatistics = async (id_mitra, year) => {
    if (!year || isNaN(year)) {
        throw new Error('Tahun harus valid.');
    }

    const statisticsByMonth = [];

    try {
        const yearStart = new Date(year, 0, 1);
        const yearEnd = new Date(year, 11, 31, 23, 59, 59);

        const packagePlusYears = await models.package_umroh.count({
            where: {
                createdAt: {
                    [Op.between]: [yearStart, yearEnd],
                },
                id_mitra,
                // package_status: 'active'
            },
            include: [{ model: models.master_category_departure, where: { category_name: 'Plus' } }],
            raw: true,
        });

        const packageRegularYears = await models.package_umroh.count({
            where: {
                createdAt: {
                    [Op.between]: [yearStart, yearEnd],
                },
                id_mitra,
                // package_status: 'active'
            },
            include: [{ model: models.master_category_departure, where: { category_name: 'Regular' } }],
            raw: true,
        });

        const totalPackagesYears = packagePlusYears + packageRegularYears;

        const percentagePlus = totalPackagesYears > 0 ? (packagePlusYears / totalPackagesYears) * 100 : 0;
        const percentageRegular = totalPackagesYears > 0 ? (packageRegularYears / totalPackagesYears) * 100 : 0;

        for (let month = 1; month <= 12; month++) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0, 23, 59, 59);

            const transaksi = await models.order.findAll({
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('id')), 'totalTransactions'],
                    [sequelize.fn('SUM', sequelize.col('subtotal')), 'totalSubTotal'],
                ],
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate],
                    },
                    id_mitra,
                    payment_status: 'paid'
                },
                raw: true,
            });

            const totalJamaah = await models.jamaah.count({
                include: [{
                    model: models.order,
                    as: 'order',
                    where: {
                        id_mitra,
                        order_status: 'confirmed',
                        createdAt: { [Op.between]: [startDate, endDate] }
                    }
                }]
            });

            const totalSubTotal = transaksi[0]?.totalSubTotal || 0;
            const nettoRevenue = totalSubTotal - (totalJamaah * 1000000);

            const totalPackage = await models.package_umroh.count({
                where: { id_mitra, package_status: 'active' }
            });

            const totalPackagePlus = await models.package_umroh.count({
                where: { id_mitra, package_status: 'active' },
                include: [{ model: models.master_category_departure, where: { category_name: 'Plus' } }]
            });

            const totalPackageRegular = await models.package_umroh.count({
                where: { id_mitra, package_status: 'active' },
                include: [{ model: models.master_category_departure, where: { category_name: 'Regular' } }]
            });

            statisticsByMonth.push({
                month,
                totalTransactions: transaksi[0]?.totalTransactions || 0,
                totalSubTotal: nettoRevenue || 0,
                totalPackage,
                totalPackagePlus,
                totalPackageRegular,
            });
        }

        return {
            year,
            packagePlusYears,
            packageRegularYears,
            monthlyStatistics: statisticsByMonth,
            percentagePlus: parseFloat(percentagePlus.toFixed(2)),
            percentageRegular: parseFloat(percentageRegular.toFixed(2))
        };

    } catch (error) {
        console.error('Error fetching yearly statistics:', error);
        throw new Error('Gagal mengambil data statistik tahunan');
    }
};



module.exports = {
    dataDashboardMitra,
    getYearlyStatistics
}