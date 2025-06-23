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

    const totalRevanue = await models.order.sum('subtotal', {
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

    return {
        allPackage,
        packageActive,
        order,
        packagePlus,
        packageRegular,
        allJamaah,
        totalRevenueThisMonth: totalRevanue || 0,
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
        for (let month = 1; month <= 12; month++) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);

            const fetchTransaksiData = async (startDate, endDate) => {
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

                // const packageRegular = await models.order.count({
                //     include: [{
                //         model: models.package_umroh, as: 'package_umroh', where: { id_mitra }, include: [
                //             { model: models.master_category_departure, where: { category_name: "Regular" } }
                //         ]
                //     }],
                //     where: { createdAt: { [Op.between]: [startDate, endDate] } }
                // });

                // const packagePlus = await models.order.count({
                //     include: [{
                //         model: models.package_umroh, as: 'package_umroh', where: { id_mitra }, iclude: [
                //             { model: models.master_category_departure, where: { category_name: "Plus" } }
                //         ]
                //     }],
                //     where: { createdAt: { [Op.between]: [startDate, endDate] } }
                // });

                // const totalPackageRegular = await models.order.sum('subtotal', {
                //     where: {
                //         createdAt: { [Op.between]: [startDate, endDate] },
                //         id_mitra,
                //         payment_status: 'paid'
                //     },
                //     include: {
                //         model: models.package_umroh,
                //         as: 'package_umroh',
                //         where: { id_mitra },
                //         include: [
                //             {
                //                 model: models.master_category_departure,
                //                 where: { category_name: "Regular" }
                //             }
                //         ]
                //     }
                // });

                // const totalPackagePlus = await models.order.sum('subtotal', {
                //     where: {
                //         createdAt: { [Op.between]: [startDate, endDate] },
                //         id_mitra,
                //         payment_status: 'paid'
                //     },
                //     include: {
                //         model: models.package_umroh,
                //         as: 'package_umroh',
                //         where: { id_mitra },
                //         include: [
                //             {
                //                 model: models.master_category_departure,
                //                 where: { category_name: "Plus" }
                //             }
                //         ]
                //     }
                // });

                const totalPackage = await models.package_umroh.count({
                    where: { id_mitra, package_status: 'active' }
                })

                const totalPackagePlus = await models.package_umroh.count({
                    where: { id_mitra, package_status: 'active' },
                    include: [{ model: models.master_category_departure, where: { category_name: 'Plus' } }]
                })

                const totalPackageRegular = await models.package_umroh.count({
                    where: { id_mitra, package_status: 'active' },
                    include: [{ model: models.master_category_departure, where: { category_name: 'Regular' } }]
                })
                return {
                    totalTransactions: transaksi[0]?.totalTransactions || 0,
                    totalSubTotal: transaksi[0]?.totalSubTotal || 0,
                    // packagePlus: packagePlus || 0,
                    // packageRegular: packageRegular || 0,
                    totalPackage: totalPackage || 0,
                    totalPackagePlus: totalPackagePlus || 0,
                    totalPackageRegular: totalPackageRegular || 0,
                };
            };

            const currentMonthData = await fetchTransaksiData(startDate, endDate);

            statisticsByMonth.push({
                month,
                ...currentMonthData
            });
        }

        return {
            year,
            monthlyStatistics: statisticsByMonth,
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