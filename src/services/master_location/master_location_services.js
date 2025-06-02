const models = require('../../models');
const sequelize = require("../../config/db");

const createMasterLocation = async (data) => {
    const { location_name } = data;
    const t = await sequelize.transaction();
    try {
        const locationDeparture = await models.master_location_departure.create({ location_name }, { transaction: t });
        await t.commit();
        return locationDeparture;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const getMasterLocation = async () => {
    return await models.master_location_departure.findAll();
};

const getMasterLocationById = async (id) => {
    return await models.master_location_departure.findOne({ where: { id } });
};

const updateMasterLocation = async (id, data) => {
    const { location_name } = data;
    const t = await sequelize.transaction();
    try {
        const locationDeparture = await models.master_location_departure.update({ location_name }, { where: { id } })
        if (!locationDeparture) throw new Error("Location Departure not found");

        await models.master_location_departure.update({ location_name }, { where: { id }, transaction: t });
        await t.commit();
        return locationDeparture();
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const nonActiveMasterLocation = async (id) => {
    await models.master_location_departure.update({ is_active: false }, { where: { id } });
    return await models.master_location_departure.findOne({ where: { id } });
};
const deleteMasterLocation = async (id) => {
    return await models.master_location_departure.destroy({ where: { id } });
};

module.exports = {
    createMasterLocation,
    getMasterLocation,
    getMasterLocationById,
    updateMasterLocation,
    nonActiveMasterLocation,
    deleteMasterLocation
};
