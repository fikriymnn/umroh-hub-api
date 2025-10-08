const { where, Op } = require("sequelize");
const models = require('../../models');
const sequelize = require("../../config/db");

const createPakcageUmroh = async (data) => {
    const {
        id_mitra,
        id_location_departure,
        id_type_departure,
        id_category_departure,
        package_name,
        description,
        date_departure,
        airline,
        duration,
        quota,
        quota_update,
        price,
        jamaah_requirements,
        airplane,
        transportation,
        schedules,
        hotel,
        facilities,
        images
    } = data;

    const t = await sequelize.transaction();

    try {
        const mitra = await models.Mitra.findByPk(id_mitra);
        if (!mitra) throw new Error("Mitra not found");

        const typeDeparture = await models.master_type_departure.findByPk(id_type_departure);
        if (!typeDeparture) throw new Error("Type Departure not found");

        const categoryDeparture = await models.master_category_departure.findByPk(id_category_departure);
        if (!categoryDeparture) throw new Error("Category Departure not found");

        const locationDeparture = await models.master_location_departure.findByPk(id_location_departure);
        if (!locationDeparture) throw new Error("Location Departure not found");

        const packageUmroh = await models.package_umroh.create({
            id_mitra: id_mitra,
            id_mitra,
            id_category_departure,
            id_location_departure,
            id_type_departure,
            package_name,
            description,
            date_departure,
            airline,
            duration,
            quota,
            quota_update,
            price,
            airplane,
            // transportation,
            jamaah_requirements,
            rating: 0,
            // date_arrival: null,
            isActive: true
        }, { transaction: t });

        if (hotel && hotel.length > 0) {
            for (const { id_hotel } of hotel) {
                await models.package_hotel.create({ id_package: packageUmroh.id, id_hotel }, { transaction: t });
            }
        }

        if (facilities && facilities.length > 0) {
            for (const { description } of facilities) {
                await models.package_facilities.create({ id_package: packageUmroh.id, description }, { transaction: t });
            }
        }

        if (transportation && transportation.length > 0) {
            for (const { description } of transportation) {
                await models.package_transportation.create({ id_package: packageUmroh.id, description }, { transaction: t });
            }
        }

        if (schedules && schedules.length > 0) {
            for (const schedule of schedules) {
                const packageSchedule = await models.package_schedule.create({
                    id_package: packageUmroh.id,
                    title: schedule.title,
                    image_url: schedule.image_url
                }, { transaction: t });

                if (schedule.details && schedule.details.length > 0) {
                    for (const detail of schedule.details) {
                        await models.detail_activity.create({
                            id_schedule: packageSchedule.id,
                            note: detail.note,
                            activity: detail.activity,
                            time: detail.time
                        }, { transaction: t });
                    }
                }
            }
        }

        if (images && images.length > 0) {
            // await models.package_image.destroy({ where: { id_package: packageUmroh.id }, transaction: t });
            for (const image of images) {
                await models.package_image.create({
                    id_package: packageUmroh.id,
                    image_url: image.image_url,
                }, { transaction: t });
            }
        }

        // await models.package_umroh.update({
        //     date_arrival: 
        // })
        await t.commit();
        return packageUmroh;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};


const editPakcageUmroh = async (id, data) => {
    const {
        id_location_departure,
        id_type_departure,
        id_category_departure,
        package_name,
        description,
        date_departure,
        airline,
        duration,
        quota,
        quota_update,
        price,
        schedules,
        hotel,
        images,
        facilities,
        package_status,
        jamaah_requirements,
        airplane,
        transportation,
        // jamaah_requirements,
    } = data;

    const t = await sequelize.transaction();

    try {
        const packageUmroh = await models.package_umroh.findByPk(id);
        if (!packageUmroh) {
            throw new Error('Package Umroh not found')
        }

        const typeDeparture = await models.master_type_departure.findByPk(id_type_departure);
        if (!typeDeparture) {
            throw new Error('Type Departure not found')
        }

        const categoryDeparture = await models.master_category_departure.findByPk(id_category_departure);
        if (!categoryDeparture) {
            throw new Error('Category Departure not found')
        }

        const locationDeparture = await models.master_location_departure.findByPk(id_location_departure);
        if (!locationDeparture) {
            throw new Error('Location Departure not found')
        }

        await models.package_umroh.update({
            id_category_departure,
            id_location_departure,
            id_type_departure,
            package_name,
            description,
            date_departure,
            airline,
            duration,
            quota,
            quota_update,
            price,
            package_status,
            jamaah_requirements,
            airplane,
            // transportation,
            // jamaah_requirements,
        }, {
            where: { id: packageUmroh.id }
            , transaction: t
        })

        if (hotel && hotel.length > 0) {
            await models.package_hotel.destroy({ where: { id_package: packageUmroh.id }, transaction: t });
            for (const { id_hotel } of hotel) {
                await models.package_hotel.create({ id_package: packageUmroh.id, id_hotel }, { transaction: t });
            }
        }

        if (facilities && facilities.length > 0) {
            await models.package_facilities.destroy({ where: { id_package: packageUmroh.id }, transaction: t });
            for (const { description } of facilities) {
                await models.package_facilities.create({ id_package: packageUmroh.id, description }, { transaction: t });
            }
        }

        if (transportation && transportation.length > 0) {
            await models.package_transportation.destroy({ where: { id_package: packageUmroh.id }, transaction: t });
            for (const { description } of transportation) {
                await models.package_transportation.create({ id_package: packageUmroh.id, description }, { transaction: t });
            }
        }

        if (schedules && schedules.length > 0) {
            const oldSchedulesData = await models.package_schedule.findAll({ where: { id_package: packageUmroh.id }, transaction: t });
            for (const schedule of oldSchedulesData) {
                await models.detail_activity.destroy({ where: { id_schedule: schedule.id }, transaction: t });
            }
            await models.package_schedule.destroy({ where: { id_package: packageUmroh.id }, transaction: t });

            for (const schedule of schedules) {
                const packageSchedule = await models.package_schedule.create({
                    id_package: packageUmroh.id,
                    title: schedule.title,
                    image_url: schedule.image_url
                }, { transaction: t });

                if (schedule.details && schedule.details.length > 0) {
                    for (const detail of schedule.details) {
                        try {
                            await models.detail_activity.create({
                                id_schedule: packageSchedule.id,
                                time: detail.time,
                                activity: detail.activity,
                                note: detail.note,
                                image_url: detail.image_url
                            }, { transaction: t });
                        } catch (err) {
                            console.error('Gagal buat detail_activity:', err);
                            throw err;
                        }
                    }

                }
            }
        }

        if (images && images.length > 0) {
            await models.package_image.destroy({ where: { id_package: packageUmroh.id }, transaction: t });
            for (const image of images) {
                await models.package_image.create({
                    id_package: packageUmroh.id,
                    image_url: image.image_url,
                }, { transaction: t });
            }
        }
        await t.commit();
        return packageUmroh;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

const updateStatusPackageUmroh = async (id, data) => {
    const { package_status } = data;
    const t = await sequelize.transaction();
    try {
        const packageUmroh = await models.package_umroh.findByPk(id);
        if (!packageUmroh) {
            throw new Error('Package Umroh not found')
        }

        await models.package_umroh.update({
            package_status
        }, {
            where: { id: id }, transaction: t
        })

        await t.commit();
        return packageUmroh;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}
const getPakcageUmroh = async (query) => {
    const filterFrom = {};

    if (query.id_category_departure) {
        filterFrom.id_category_departure = query.id_category_departure;
    }

    if (query.id_location_departure) {
        filterFrom.id_location_departure = query.id_location_departure;
    }

    if (query.id_type_departure) {
        filterFrom.id_type_departure = query.id_type_departure;
    }

    if (query.price) {
        filterFrom.price = query.price;
    }

    if (query.duration) {
        filterFrom.duration = query.duration;
    }

    if (query.package_status) {
        filterFrom.package_status = query.package_status;
    }

    if (query.date_departure) {
        const start = new Date(query.date_departure);
        start.setUTCHours(0, 0, 0, 0); // fix jam ke 00:00 UTC

        const end = new Date(start);
        end.setUTCDate(end.getUTCDate() + 1); // tambah 1 hari

        console.log('📅 Start:', start.toISOString());
        console.log('📅 End:', end.toISOString());
        console.log(query.date_departure);
        console.log(query);


        filterFrom.date_departure = {
            [Op.gte]: start,
            [Op.lt]: end
        };
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    return await models.package_umroh.findAll({
        where: filterFrom,
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: models.master_type_departure
            },
            {
                model: models.master_category_departure
            },
            {
                model: models.master_location_departure
            },
            {
                model: models.package_hotel,
                include: [
                    {
                        model: models.master_hotel,
                        include: [
                            {
                                model: models.hotel_facilities
                            }
                        ]
                    }
                ]
            },
            {
                model: models.package_facilities,
            },
            {
                model: models.package_schedule,
                include: [
                    {
                        model: models.detail_activity
                    }
                ]
            },
        ]
    });
};

const getPakcageUmrohByIdView = async (id) => {
    const packageUmroh = await models.package_umroh.findOne({
        where: { id: id },
        include: [
            {
                model: models.Mitra
            },
            {
                model: models.master_type_departure
            },
            {
                model: models.master_category_departure
            },
            {
                model: models.master_location_departure
            },
            {
                model: models.package_hotel,
                include: [
                    {
                        model: models.master_hotel,
                        include: [
                            {
                                model: models.hotel_facilities
                            }
                        ]
                    }
                ]
            },
            {
                model: models.package_facilities,
            },
            {
                model: models.package_schedule,
                include: [
                    {
                        model: models.detail_activity
                    }
                ]
            },
            {
                model: models.review,
                include: [
                    {
                        model: models.review_image
                    },
                    {
                        model: models.User
                    }
                ]
            }
        ]
    });

    if (packageUmroh) {
        await packageUmroh.increment('view_package');
    }

    return packageUmroh;
};

const getPakcageUmrohById = async (id) => {
    const detailPackage = await models.package_umroh.findOne({
        where: { id: id },
        include: [
            {
                model: models.Mitra
            },
            {
                model: models.master_type_departure
            },
            {
                model: models.master_category_departure
            },
            {
                model: models.master_location_departure
            },
            {
                model: models.package_hotel,
                include: [
                    {
                        model: models.master_hotel,
                        include: [
                            {
                                model: models.hotel_facilities
                            }
                        ]
                    }
                ]
            },
            {
                model: models.package_facilities,
            },
            {
                model: models.package_schedule,
                include: [
                    {
                        model: models.detail_activity
                    }
                ]
            },
            {
                model: models.review,
                include: [
                    {
                        model: models.review_image
                    },
                    {
                        model: models.User
                    }
                ]
            }
        ]
    });
    const totalJamaahFemale = await models.order.count({
        where: { id_package: id },
        include: [{ model: models.jamaah, as: 'jamaah', where: { gender: "female" } }]
    })

    const totalJamaahMale = await models.order.count({
        where: { id_package: id },
        include: [{ model: models.jamaah, as: 'jamaah', gender: "male" }]
    })

    const totalOrder = await models.order.count({
        where: { id_package: id },
        // include: [{ model: models.jamaah, as: 'jamaah', gender: "male" }]
    })

    const totalJamaah = totalJamaahFemale + totalJamaahMale

    const detailJamaah = await models.order.findAll({
        attributes: ['id'],
        where: { id_package: id },
        include: [{ model: models.jamaah, as: 'jamaah' }]
    })

    return {
        detailPackage,
        detailJamaah,
        totalJamaahFemale,
        totalJamaahMale,
        totalJamaah,
        totalOrder
    }
};

const deletePackageUmrohServices = async (id) => {
    const t = await models.sequelize.transaction();
    try {
        const pkg = await models.package_umroh.findByPk(id);
        if (!pkg) throw new Error('Package Umroh not found');

        await models.package_hotel.destroy({ where: { id_package: id }, transaction: t });
        await models.package_facilities.destroy({ where: { id_package: id }, transaction: t });
        await models.package_schedule.destroy({ where: { id_package: id }, transaction: t });

        const result = await models.package_umroh.destroy({ where: { id }, transaction: t });

        await t.commit();
        return result;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const nonActivePackageUmrohServices = async (id) => {
    await models.package_umroh.update({ is_active: false }, { where: { id } });
    return await models.package_umroh.findOne({ where: { id } });
};


const getPackageUmrohByMitra = async (id, query) => {
    const filterFrom = {
        id_mitra: id
    };

    if (query.id_category_departure) {
        filterFrom.id_category_departure = query.id_category_departure;
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    return await models.package_umroh.findAll({
        where: filterFrom,
        limit,
        offset,
        include: [
            {
                model: models.master_type_departure
            },
            {
                model: models.master_category_departure
            },
            {
                model: models.master_location_departure
            },
            {
                model: models.package_hotel,
                include: [
                    {
                        model: models.master_hotel,
                        include: [
                            {
                                model: models.hotel_facilities
                            }
                        ]
                    }
                ]
            },
            {
                model: models.package_facilities,
            },
            {
                model: models.package_schedule,
                include: [
                    {
                        model: models.detail_activity
                    }
                ]
            },
        ]
    });
}

const rejectUmrohPackage = async (id, data) => {
    const { admin_note } = data;
    const t = await models.sequelize.transaction();
    try {
        const pkg = await models.package_umroh.findByPk(id);
        if (!pkg) throw new Error('Package Umroh not found');

        await models.package_umroh.update({
            admin_note,
            package_status: 'rejected'
        }, {
            where: { id: id }, transaction: t
        })
        const package = await models.package_umroh.findByPk(id);
        await t.commit();
        return package;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

const updateStatusDeparture = async (id, data) => {
    const { departure_status } = data;
    // if (!departure_status) {
    //     throw new Error('deprture not found')
    // }
    const today = new Date()
    const t = await sequelize.transaction();
    try {
        const PackageUmroh = await models.package_umroh.findByPk(id);
        if (!PackageUmroh) {
            throw new Error('Package Umroh not found')
        }
        console.log(departure_status);
        console.log("tanggal", today);


        if (departure_status === 'departure') {
            await models.package_umroh.update({
                departure_status,
                package_status: 'departure'
            }, {
                where: { id: id }, transaction: t
            })

            await models.order.update({
                departure_status
            }, {
                where: { id_package: id }, transaction: t
            })
        }

        if (departure_status === 'arrival') {
            await models.package_umroh.update({
                departure_status,
                package_status: 'history'
            }, {
                where: { id: id }, transaction: t
            })

            await models.order.update({
                departure_status
            }, {
                where: { id_package: id }, transaction: t
            })

        }

        await t.commit();
        return PackageUmroh;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

const konfirmationPackageUmroh = async (id) => {
    await models.package_umroh.update({ konfirmation_status: true, package_status: 'Active' }, { where: { id } });
    return await models.package_umroh.findOne({ where: { id } });
};



const addActualDateDeparture = async (id, data) => {
    const { actual_departure_date } = data;
    const t = await models.sequelize.transaction();
    try {
        const pkg = await models.package_umroh.findByPk(id);
        if (!pkg) throw new Error('Package Umroh not found');

        await models.package_umroh.update({
            actual_departure_date,
        }, {
            where: { id: id }, transaction: t
        })
        const package = await models.package_umroh.findByPk(id);
        await t.commit();
        return package;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}


// const getStatisticsPackageUmroh = async (year, month) => {
//     if (!year || isNaN(year)) {
//         throw new Error('Tahun harus valid.');
//     }
//     if (!month || isNaN(month) || month < 1 || month > 12) {
//         throw new Error('Bulan harus valid (1–12).');
//     }

//     try {
//         const startDate = new Date(year, month - 1, 1);
//         const endDate = new Date(year, month, 0, 23, 59, 59);

//         const pkgKonfirmationTrue = await models.package_umroh.count({
//             where: {
//                 createdAt: { [Op.between]: [startDate, endDate] },
//                 id_mitra,
//                 konfirmation_status: true,
//                 // order_status: 'confirmed'
//             },
//             raw: true,
//         });

//         const pkgRejected = await models.package_umroh.count({
//             where: {
//                 createdAt: { [Op.between]: [startDate, endDate] },
//                 id_mitra,
//                 konfirmation_status: false,
//                 package_status: 'rejected'
//             },
//             raw: true,
//         });

//         const total_package = pkgKonfirmationTrue + pkgRejected;

//         const detailPackage = await models.package_umroh.findAll({
//             where: {
//                 createdAt: { [Op.between]: [startDate, endDate] },
//                 id_mitra,
//                 // konfirmation_status: false,
//                 package_status: 'rejected'
//             },
//             raw: true,
//         });

//         return {
//             year,
//             month,
//             totalTransactions: transaksi[0]?.totalTransactions || 0,
//             totalSubTotal,
//             totalJamaah,
//             nettoRevenue,
//             totalPackage,
//             totalPackagePlus,
//             totalPackageRegular,
//         };

//     } catch (error) {
//         console.error('Error fetching statistics:', error);
//         throw new Error('Gagal mengambil data statistik bulanan');
//     }
// };

module.exports = {
    createPakcageUmroh,
    editPakcageUmroh,
    getPakcageUmroh,
    getPakcageUmrohById,
    deletePackageUmrohServices,
    nonActivePackageUmrohServices,
    updateStatusPackageUmroh,
    getPackageUmrohByMitra,
    rejectUmrohPackage,
    getPakcageUmrohByIdView,
    updateStatusDeparture,
    konfirmationPackageUmroh,
    addActualDateDeparture
}

