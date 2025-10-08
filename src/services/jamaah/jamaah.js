const models = require('../../models');
const { Op } = models.Sequelize;
console.log("Op.between =>", Op.between);
const sequelize = models.sequelize;

const getJamaah = async (query) => {
    const filterFrom = {};

    if (query.gender) {
        filterFrom.gender = query.gender;
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const orderBy = query.order_by || 'createdAt';
    const sort = (query.sort || 'DESC').toUpperCase();

    return await models.jamaah.findAll({
        where: filterFrom,
        limit,
        offset,
        order: [[orderBy, sort]],
    });
};

// const getDataJamaah = async (year) => {
//     try {

//     } catch (error) {

//     }
// }

const getYearlyStatisticsJamaah = async (query) => {
    if (!query.year || isNaN(query.year)) {
        throw new Error('Tahun harus valid.');
    }

    const year = parseInt(query.year, 10);
    const monthQuery = query.month ? parseInt(query.month, 10) : null;
    const statisticsByMonth = [];

    try {
        const totalJamaah = await models.jamaah.count({
            include: [{
                model: models.order,
                as: 'order',
                required: true,
                where: { order_status: 'confirmed' }
            }]
        });

        if (monthQuery && !isNaN(monthQuery)) {
            const startDate = new Date(year, monthQuery - 1, 1);
            const endDate = new Date(year, monthQuery, 0, 23, 59, 59);

            const subtotalJamaah = await models.jamaah.count({
                include: [{
                    model: models.order,
                    as: 'order',
                    required: true,
                    where: {
                        order_status: 'confirmed',
                        createdAt: { [Op.between]: [startDate, endDate] }
                    }
                }]
            });

            statisticsByMonth.push({
                month: monthQuery,
                subtotalJamaah
            });

        } else {
            for (let month = 1; month <= 12; month++) {
                const startDate = new Date(year, month - 1, 1);
                const endDate = new Date(year, month, 0, 23, 59, 59);

                const subtotalJamaah = await models.jamaah.count({
                    include: [{
                        model: models.order,
                        as: 'order',
                        required: true,
                        where: {
                            order_status: 'confirmed',
                            createdAt: { [Op.between]: [startDate, endDate] }
                        }
                    }]
                });

                statisticsByMonth.push({
                    month,
                    subtotalJamaah
                });
            }
        }

        return {
            year,
            month: monthQuery || null,
            totalJamaah,
            monthlyStatistics: statisticsByMonth,
        };

    } catch (error) {
        console.error('Error fetching yearly statistics:', error);
        throw new Error('Gagal mengambil data statistik tahunan');
    }
};

const getJamaahToday = async (query) => {
    const today = new Date(query.date);

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    console.log('Tanggal:', startOfDay, endOfDay);

    return await models.jamaah.findAll({
        where: {
            createdAt: {
                [Op.between]: [startOfDay, endOfDay],
            },
        },
        order: [["createdAt", "DESC"]],
    });
};



const getJamaahId = async (id) => {
    return await models.jamaah.findOne({ where: { id } });
}

module.exports = {
    getJamaah,
    getYearlyStatisticsJamaah,
    getJamaahToday,
    getJamaahId
}