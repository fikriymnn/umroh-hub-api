const { where } = require("sequelize");
const models = require('../../models');
const sequelize = require("../../config/db");

const createPakcageUmroh = async (data) => {
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
        facilities,
        // images
    } = data;

    const t = await sequelize.transaction();

    try {
        // const mitra = await models.mitra.findByPk(userId);
        // if (!mitra) {
        //     return res.status(404).json({ message: 'Mitra not found' })
        // }

        const typeDeparture = await models.master_type_departure.findByPk(id_type_departure);
        if (!typeDeparture) {
            return res.status(404).json({ message: 'Type Departure not found' })
        }

        const categoryDeparture = await models.master_category_departure.findByPk(id_category_departure);
        if (!categoryDeparture) {
            return res.status(404).json({ message: 'Category Departure not found' })
        }

        const locationDeparture = await models.master_location_departure.findByPk(id_location_departure);
        if (!locationDeparture) {
            return res.status(404).json({ message: 'Location Departure not found' })
        }

        const packageUmroh = await models.package_umroh.create({
            // id_mitra: userId,
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
        }, { transaction: t })

        if (hotel && hotel.length > 0) {
            for (const { id_hotel, description } of hotel) {
                await models.package_hotel.create({ id_package: packageUmroh.id, id_hotel, description }, { transaction: t });
            }
        }

        if (facilities && facilities.length > 0) {
            for (const { description } of facilities) {
                await models.package_facilities.create({ id_package: packageUmroh.id, description }, { transaction: t });
            }
        }

        if (schedules && schedules.length > 0) {
            for (const schedule of schedules) {
                const packageSchedule = await models.package_schedule.create({
                    id_package: packageUmroh.id,
                    title: schedule.title
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

        // if (images && images.length > 0) {
        //     for (const images of images) {
        //         await Package_image.create({
        //             id_package: packageUmroh.id,
        //             image_url: foto.url,
        //         }, { transaction: t });
        //     }
        // }
        await t.commit();
        return packageUmroh;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

// const editPakcageUmroh = async (id, data) => {
//     const {
//         id_location_departure,
//         id_type_departure,
//         id_category_departure,
//         package_name,
//         description,
//         date_departure,
//         airline,
//         duration,
//         quota,
//         quota_update,
//         price,
//         schedules,
//         hotel,
//         images
//     } = data;

//     const t = await sequelize.transaction();

//     try {
//         const packageUmroh = await Package_umroh.findByPk(id);
//         if (!packageUmroh) {
//             return res.status(404).json({ message: 'Package Umroh not found' })
//         }

//         const typeDeparture = await Master_type_departure.findByPk(id_type_departure);
//         if (!typeDeparture) {
//             return res.status(404).json({ message: 'Type Departure not found' })
//         }

//         const categoryDeparture = await Master_category_departure.findByPk(id_category_departure);
//         if (!categoryDeparture) {
//             return res.status(404).json({ message: 'Category Departure not found' })
//         }

//         const locationDeparture = await Master_location.findByPk(id_location_departure);
//         if (!locationDeparture) {
//             return res.status(404).json({ message: 'Location Departure not found' })
//         }

//         Package_umroh.update({
//             id_category_departure,
//             id_location_departure,
//             id_type_departure,
//             package_name,
//             description,
//             date_departure,
//             airline,
//             duration,
//             quota,
//             quota_update,
//             price,
//         }, {
//             where: { id: packageUmroh.id }
//             , transaction: t
//         })

//         await Package_hotel.destroy({ where: { id_package: Package_umroh.id }, transaction: t });
//         if (hotel && hotel.length > 0) {
//             for (const { id_hotel, description } of hotel) {
//                 await Package_hotel.create({ id_package: packageUmroh.id, id_hotel, description }, { transaction: t });
//             }
//         }

//         await Package_hotel.destroy({ where: { id_package: Package_umroh.id }, transaction: t });
//         if (schedules && schedules.length > 0) {
//             for (const schedule of schedules) {
//                 const packageSchedule = await Package_schedule.create({
//                     id_package: packageUmroh.id,
//                     title: schedule.title
//                 }, { transaction: t });

//                 if (schedule.details && schedule.details.length > 0) {
//                     for (const detail of schedule.details) {
//                         await Detail_activity.create({
//                             id_schedule: packageSchedule.id,
//                             description: detail.description
//                         }, { transaction: t });
//                     }
//                 }
//             }
//         }

//         await Package_image.destroy({ where: { id_package: Package_umroh.id }, transaction: t });
//         if (images && images.length > 0) {
//             for (const images of images) {
//                 await Package_image.create({
//                     id_package: packageUmroh.id,
//                     image_url: foto.url,
//                 }, { transaction: t });
//             }
//         }
//         await t.commit();
//         return packageUmroh;
//     } catch (error) {
//         await t.rollback();
//         throw error;
//     }
// }

module.exports = {
    createPakcageUmroh,
    // editPakcageUmroh
}