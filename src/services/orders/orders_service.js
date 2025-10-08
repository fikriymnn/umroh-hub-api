// const { where } = require("sequelize");
const models = require('../../models');
const sequelize = require("../../config/db");
const cron = require('node-cron');
const { Op } = require('sequelize');
// const client = require("../../../waasap/client")

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
            for (const { name, email, gender, phone_number, visa_url, passport_url } of jamaah) {
                await models.jamaah.create({ id_order: order.id, name, email, gender, phone_number, visa_url, passport_url }, { transaction: t });
            }

        }
        const totalJamaah = await models.jamaah.count({
            where: { id_order: order.id },
            transaction: t
        });

        const quotaUpdate = packageUmroh.quota - totalJamaah;

        await models.package_umroh.update({
            quota_update: quotaUpdate
        }, {
            where: { id: id_package },
            transaction: t
        });

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
        by_name_of
    } = data;
    const t = await sequelize.transaction();
    try {
        const order = await models.order.findOne({ where: { order_id: order_id } })
        if (!order) throw new Error("Order not found");

        const packageUmroh = await models.package_umroh.findByPk(order.id_package)
        if (!packageUmroh) throw new Error("Order not found");

        await models.order.update({
            payment_method,
            bank,
            no_rek,
            transaction_proof_url,
            by_name_of,
            payment_status: 'paid',
        }, { where: { order_id: order_id }, transaction: t })

        // const jamaah = await models.jamaah.count({ where: { id_order: order.id } })
        // const quota_update = packageUmroh.quota - jamaah;

        // await models.package_umroh.update({
        //     quota_update: quota_update
        // }, { where: { id: order.id_package } })

        await t.commit();
        return order;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

cron.schedule('* * * * *', async () => {
    const batasWaktu = new Date(Date.now() - 24 * 60 * 60 * 1000);

    try {
        const expiredOrders = await models.order.findAll({
            where: {
                payment_status: 'pending',
                createdAt: { [Op.lte]: batasWaktu }
            },
            include: [
                { model: models.jamaah, as: 'jamaah' },
                { model: models.package_umroh, as: 'package_umroh' }
            ]
        });

        let totalUpdated = 0;

        for (const order of expiredOrders) {
            const jumlahJamaah = order.jamaah.length;

            await models.order.update(
                { payment_status: 'failed' },
                { where: { id: order.id } }
            );

            const paket = await models.package_umroh.findByPk(order.id_package);
            if (paket) {
                const newQuotaUpdate = paket.quota_update + jumlahJamaah;
                await models.package_umroh.update(
                    { quota_update: newQuotaUpdate },
                    { where: { id: paket.id } }
                );
            }

            totalUpdated++;
        }

        console.log(`Cronjob: ${totalUpdated} order expired di-set failed & quota dikembalikan.`);
    } catch (error) {
        console.error('Gagal memproses cronjob order:', error.message);
    }
});


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
            for (const { name, email, gender, phone_number, visa_url, passport_url } of jamaah) {
                await models.jamaah.create({ id_order: orders.id, name, email, gender, phone_number, visa_url, passport_url }, { transaction: t });
            }
        }
        await t.commit();
        return orders;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const updateStatusOrder = async (id, data) => {
    const { order_status } = data;
    const t = await sequelize.transaction();
    try {
        const Order = await models.order.findByPk(id);
        if (!Order) {
            throw new Error('Package Umroh not found')
        }

        await models.order.update({
            order_status
        }, {
            where: { id: id }, transaction: t
        })

        await t.commit();
        return Order;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

const uploadCompleteDataJamaah = async (id, data) => {
    const { visa_url, passport_url, hotel_ticket, airplane_ticket } = data;
    const t = await sequelize.transaction();
    try {
        const Jamaah = await models.jamaah.findByPk(id);
        if (!Jamaah) throw new Error('Jamaah Umroh not found');

        await models.jamaah.update({
            visa_url: visa_url ?? Jamaah.visa_url,
            passport_url: passport_url ?? Jamaah.passport_url,
            hotel_ticket,
            airplane_ticket
        }, {
            where: { id },
            transaction: t
        });

        await t.commit();
        return Jamaah;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

const updateStatusDeparture = async (id) => {
    // const { departure_status } = data;
    const t = await sequelize.transaction();
    try {
        const Order = await models.order.findByPk(id);
        if (!Order) {
            throw new Error('Package Umroh not found')
        }

        await models.order.update({
            departure_status: true
        }, {
            where: { id: id }, transaction: t
        })

        await t.commit();
        return Order;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}
const getOrders = async (query) => {
    const filterFrom = {};

    if (query.payment_status) {
        filterFrom.payment_status = query.payment_status;
    }

    if (query.order_status) {
        filterFrom.order_status = query.order_status;
    }
    return await models.order.findAll({
        where: filterFrom,
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
                        model: models.package_transportation
                    },
                    {
                        model: models.package_hotel,
                        include: [
                            {
                                model: models.master_hotel,
                                include: [
                                    {
                                        model: models.hotel_facilities
                                    },
                                    {
                                        model: models.general_facilities
                                    },
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

const getOrdersByIdMitra = async (id, query) => {
    const filterFrom = {
        id_mitra: id,
        order_status: 'confirmed',
        payment_status: 'paid'
    };

    if (query.payment_status) {
        filterFrom.payment_status = query.payment_status;
    }

    // if (query.order_status) {
    //     filterFrom.order_status = query.order_status;
    // }

    console.log("query:", query);
    console.log("filterFrom:", filterFrom);

    return await models.order.findAll({
        where: filterFrom,
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
                        model: models.master_category_departure,
                        where: query.category_name ? { category_name: query.category_name } : undefined
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

const getOrdersByIdUser = async (id, query) => {
    const filterFrom = {
        id_user: id
    };

    if (query.payment_status) {
        filterFrom.payment_status = query.payment_status;
    }

    if (query.order_status) {
        filterFrom.order_status = query.order_status;
    }

    console.log("query:", query);
    console.log("filterFrom:", filterFrom);

    return await models.order.findAll({
        where: filterFrom,
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

const rejectOrder = async (id, data) => {
    const { note } = data;
    const t = await models.sequelize.transaction();
    try {
        const ord = await models.order.findByPk(id);
        if (!ord) throw new Error('Order not found');

        await models.order.update({
            note,
            order_status: 'cancelled'
        }, {
            where: { id: id }, transaction: t
        })
        const order = await models.order.findByPk(id);
        await t.commit();
        return order;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

module.exports = {
    createOrders,
    getOrders,
    getOrdersById,
    deleteOrdersServices,
    editOrder,
    paymentOrder,
    getOrdersByIdUser,
    updateStatusOrder,
    getOrdersByIdMitra,
    updateStatusDeparture,
    uploadCompleteDataJamaah,
    rejectOrder
}

