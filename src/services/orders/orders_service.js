const { where } = require("sequelize");
const models = require('../../models');
const sequelize = require("../../config/db");

const createOrders = async (data) => {
    const {
        id_user,
        // id_mitra,
        id_package,
        // subtotal,
        // payment_status,
        jamaah,
        // departure_status,
        // order_status,
        // payment_method,
        // bank,
        // no_rek,
    } = data;
    const t = await sequelize.transaction();
    let order;
    try {
        const user = await models.User.findByPk(id_user);
        if (!user) throw new Error("User not found");

        const packageUmroh = await models.package_umroh.findByPk(id_package);
        if (!packageUmroh) throw new Error("Package Umroh not found");

        const mitra = await models.Mitra.findOne({ where: { id: packageUmroh.id_mitra } });
        if (!mitra) throw new Error("Mitra not found");

        const jumlahJamaah = jamaah?.length || 0;
        const subtotal = packageUmroh.price * jumlahJamaah;
        console.log(models.order);
        console.log(models.jamaah);

        order = await models.order.create({
            id_user,
            id_mitra: packageUmroh.id_mitra,
            id_package,
            subtotal: subtotal,
            payment_status: 'pending',
            departure_status: false,
            order_status: 'waiting',
            // payment_method,
            // bank,
            // no_rek,
            isActive: true
        }, { transaction: t });

        const now = new Date();
        const wibTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
        const dateStr = wibTime.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14); // YYYYMMDDHHMMSS
        const orderCode = `ORD-${dateStr}${order.id}`;
        console.log(now);


        await models.order.update({ order_id: orderCode }, { where: { id: order.id }, transaction: t });

        if (jamaah && jamaah.length > 0) {
            for (const { name, email, gender, phone_number } of jamaah) {
                await models.jamaah.create({ id_order: order.id, name, email, gender, phone_number }, { transaction: t });
            }

        }
        await t.commit();
    } catch (error) {
        if (!t.finished) await t.rollback();
        throw error;
    }
    return await models.order.findOne({
        where: { id: order.id },
        include: [{ model: models.jamaah, as: 'jamaah' }]
    });
};

const paymentOrder = async (order_id, data) => {
    const {
        // order_id,
        payment_method,
        bank,
        no_rek,
        transaction_proof_url,
    } = data;
    const t = await sequelize.transaction();
    try {
        const order = await models.order.findOne({ where: { order_id: order_id } })
        if (!order) throw new Error("Order not found");

        await models.order.update({
            payment_method,
            bank,
            no_rek,
            transaction_proof_url,
            payment_status: 'paid',
        }, { where: { order_id: order_id }, transaction: t })

        await t.commit();
        return order;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}
const editOrder = async (id, data) => {
    const {
        // id_user,
        // id_mitra,
        // id_package,
        // subtotal,
        payment_status,
        jamaah,
        departure_status,
        order_status,
        payment_method,
        bank,
        no_rek,
    } = data;
    const t = await sequelize.transaction();

    try {
        const orders = await models.order.findByPk(id);
        if (!orders) throw new Error("Order not found");

        const packageUmroh = await models.package_umroh.findOne({ where: { id: orders.id_package } });
        if (!packageUmroh) throw new Error("Package Umroh not found");

        const jumlahJamaah = jamaah?.length || 0;
        const subtotal = packageUmroh.price * jumlahJamaah;

        await models.order.update({
            subtotal: subtotal,
            payment_status,
            departure_status,
            order_status,
            payment_method,
            bank,
            no_rek,
        }, { where: { id: id }, transaction: t });

        if (jamaah && jamaah.length > 0) {
            await models.jamaah.destroy({ where: { id_order: orders.id }, transaction: t });
            for (const { name, email, gender, phone_number } of jamaah) {
                await models.jamaah.create({ id_order: orders.id, name, email, gender, phone_number }, { transaction: t });
            }
        }
        await t.commit();
        return orders;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const getOrders = async () => {
    return await models.order.findAll({
        include: [
            {
                model: models.jamaah, as: 'jamaah'
            },
            {
                model: models.User, as: 'user'
            },
            {
                model: models.Mitra, as: 'mitra'
            },
            {
                model: models.package_umroh, as: 'package_umroh',
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
            },
        ]
    });
};

const getOrdersById = async (id) => {
    return await models.order.findOne({
        where: { id: id },
        include: [
            {
                model: models.jamaah, as: 'jamaah'
            },
            {
                model: models.User, as: 'user'
            },
            {
                model: models.Mitra, as: 'mitra'
            },
            {
                model: models.package_umroh, as: 'package_umroh',
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
            },
        ]
    });
};

const deleteOrdersServices = async (id) => {
    await models.jamaah.destroy({ where: { id_order: id } })
    return await models.order.destroy({ where: { id } });
};
module.exports = {
    createOrders,
    getOrders,
    getOrdersById,
    deleteOrdersServices,
    editOrder,
    paymentOrder
}

