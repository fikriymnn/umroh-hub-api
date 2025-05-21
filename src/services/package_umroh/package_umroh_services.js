const { where } = require("sequelize");
const Detail_activity = require("../../models/detail_activity");
const Master_category_departure = require("../../models/master_category_departure");
const Master_location = require("../../models/master_location");
const Master_type_departure = require("../../models/master_type_departure");
const Mitra = require("../../models/mitra");
const Package_hotel = require("../../models/package_hotel");
const Package_image = require("../../models/package_image");
const Package_schedule = require("../../models/package_schedule");
const Package_umroh = require("../../models/package_umroh");

const createPakcageUmroh = async (userId, data) => {
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
        images
    } = data;

    const t = await sequelize.transaction();

    try {
        const mitra = await Mitra.findByPk(userId);
        if (!mitra) {
            return res.status(404).json({ message: 'Mitra not found' })
        }

        const typeDeparture = await Master_type_departure.findByPk(id_type_departure);
        if (!typeDeparture) {
            return res.status(404).json({ message: 'Type Departure not found' })
        }

        const categoryDeparture = await Master_category_departure.findByPk(id_category_departure);
        if (!categoryDeparture) {
            return res.status(404).json({ message: 'Category Departure not found' })
        }

        const locationDeparture = await Master_location.findByPk(id_location_departure);
        if (!locationDeparture) {
            return res.status(404).json({ message: 'Location Departure not found' })
        }

        const packageUmroh = await Package_umroh.create({
            id_mitra: userId,
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
                await Package_hotel.create({ id_package: packageUmroh.id, id_hotel, description }, { transaction: t });
            }
        }

        if (schedules && schedules.length > 0) {
            for (const schedule of schedules) {
                const packageSchedule = await Package_schedule.create({
                    id_registrasi: reservasi.id,
                    day: schedule.day
                }, { transaction: t });

                if (schedule.details && schedule.details.length > 0) {
                    for (const detail of schedule.details) {
                        await Detail_activity.create({
                            id_schedule: packageSchedule.id,
                            description: detail.description
                        }, { transaction: t });
                    }
                }
            }
        }

        if (images && images.length > 0) {
            for (const images of images) {
                await Package_image.create({
                    id_package: packageUmroh.id,
                    image_url: foto.url,
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
        images
    } = data;

    const t = await sequelize.transaction();

    try {
        const packageUmroh = await Package_umroh.findByPk(id);
        if (!packageUmroh) {
            return res.status(404).json({ message: 'Package Umroh not found' })
        }

        const typeDeparture = await Master_type_departure.findByPk(id_type_departure);
        if (!typeDeparture) {
            return res.status(404).json({ message: 'Type Departure not found' })
        }

        const categoryDeparture = await Master_category_departure.findByPk(id_category_departure);
        if (!categoryDeparture) {
            return res.status(404).json({ message: 'Category Departure not found' })
        }

        const locationDeparture = await Master_location.findByPk(id_location_departure);
        if (!locationDeparture) {
            return res.status(404).json({ message: 'Location Departure not found' })
        }

        Package_umroh.update({
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
        }, {
            where: { id: packageUmroh.id }
            , transaction: t
        })

        await Package_hotel.destroy({ where: { id_package: Package_umroh.id }, transaction: t });
        if (hotel && hotel.length > 0) {
            for (const { id_hotel, description } of hotel) {
                await Package_hotel.create({ id_package: packageUmroh.id, id_hotel, description }, { transaction: t });
            }
        }

        await Package_hotel.destroy({ where: { id_package: Package_umroh.id }, transaction: t });
        if (schedules && schedules.length > 0) {
            for (const schedule of schedules) {
                const packageSchedule = await Package_schedule.create({
                    id_package: packageUmroh.id,
                    title: schedule.title
                }, { transaction: t });

                if (schedule.details && schedule.details.length > 0) {
                    for (const detail of schedule.details) {
                        await Detail_activity.create({
                            id_schedule: packageSchedule.id,
                            description: detail.description
                        }, { transaction: t });
                    }
                }
            }
        }

        await Package_image.destroy({ where: { id_package: Package_umroh.id }, transaction: t });
        if (images && images.length > 0) {
            for (const images of images) {
                await Package_image.create({
                    id_package: packageUmroh.id,
                    image_url: foto.url,
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

module.exports = {
    createPakcageUmroh,
    editPakcageUmroh
}