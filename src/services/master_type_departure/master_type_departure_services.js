const models = require('../../models');
const sequelize = require("../../config/db");

const createMasterTypeDeparture = async (data) => {
    const { type_name } = data;
    const t = await sequelize.transaction();
    try {
        const typeDeparture = await models.master_type_departure.create({ type_name }, { transaction: t });
        await t.commit();
        return typeDeparture;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const getMasterTypeDeparture = async () => {
    return await models.master_type_departure.findAll();
};

const getMasterTypeDepartureById = async (id) => {
    return await models.master_type_departure.findOne({ where: { id } });
};

const updateMasterTypeDeparture = async (id, data) => {
    const { type_name } = data;
    const t = await sequelize.transaction();
    try {
        const typeDeparture = await models.master_type_departure.findOne({ where: { id } });
        if (!typeDeparture) throw new Error("Type Departure not found");

        await models.master_type_departure.update({ type_name }, { where: { id }, transaction: t });
        await t.commit();
        return typeDeparture();
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const nonActiveMasterTypeDeparture = async (id) => {
    await models.master_type_departure.update({ is_active: false }, { where: { id } });
    return await models.master_type_departure.findOne({ where: { id } });
};
const deleteMasterTypeDeparture = async (id) => {
    return await models.master_type_departure.destroy({ where: { id } });
};

module.exports = {
    createMasterTypeDeparture,
    getMasterTypeDeparture,
    getMasterTypeDepartureById,
    updateMasterTypeDeparture,
    nonActiveMasterTypeDeparture,
    deleteMasterTypeDeparture
};
