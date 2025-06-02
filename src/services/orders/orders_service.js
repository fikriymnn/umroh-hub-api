const { where } = require("sequelize");
const models = require('../../models');
const sequelize = require("../../config/db");

const createOrders = async (data) => {
    const {
        id_user,
        id_mitra,
        id_package,
        // subtotal,
        // payment_status,
        jamaah,
        departure_status,
        // order_status,
        payment_method,
        bank,
        no_rek,
    } = data;
    const t = await sequelize.transaction();

    try {
        let subtotal = 0;
        const mitra = await models.Mitra.findByPk(id_mitra);
        if (!mitra) throw new Error("Mitra not found");

        const user = await models.user.findByPk(id_user);
        if (!user) throw new Error("User not found");

        const packageUmroh = await models.package_umroh.findByPk(id_package);
        if (!packageUmroh) throw new Error("Package Umroh not found");

        const order = await models.order.create({
            id_user,
            id_mitra,
            id_package,
            subtotal: subtotal,
            payment_status: 'pending',
            departure_status,
            order_status: 'waiting',
            payment_method,
            bank,
            no_rek,
        }, { transaction: t });

        if (jamaah && jamaah.length > 0) {
            for (const { name, email, gender, phone_number } of hotel) {
                await models.package_hotel.create({ id_order: order.id, name, email, gender, phone_number }, { transaction: t });
            }
        }

        await t.commit();
        return packageUmroh;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const getPakcageUmroh = async () => {
    return await models.package_umroh.findAll({
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

const getPakcageUmrohById = async (id) => {
    return await models.package_umroh.findOne({
        where: { id: id },
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

const deletePakcageUmroh = async (id) => {
    await models.package_hotel.destroy({ where: { id_package: id } });
    await models.package_facilities.destroy({ where: { id_package: id } });
    await models.package_schedule.destroy({ where: { id_package: id } });
    // await models.detail_activity.destroy({ where: { id } });
    return await models.package_umroh.destroy({ where: { id } });
};
module.exports = {
    createOrders,
    getPakcageUmroh,
    getPakcageUmrohById,
    deletePakcageUmroh
}

