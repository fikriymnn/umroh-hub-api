const models = require('../../models');
const sequelize = require("../../config/db");


const createMasterCategoryDeparture = async (data) => {
    const { category_name } = data;
    const t = await sequelize.transaction();
    try {
        const categoryDeparture = await models.master_category_departure.create({ category_name }, { transaction: t });
        await t.commit();
        return categoryDeparture;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const getMasterCategoryDeparture = async () => {
    return await models.master_category_departure.findAll();
};

const getMasterCategoryDepartureById = async (id) => {
    return await models.master_category_departure.findOne({ where: { id } });
};
const updateMasterCategoryDeparture = async (id, data) => {
    const { category_name } = data;
    const t = await sequelize.transaction();
    try {
        const categoryDeparture = await models.master_category_departure.findOne({ where: { id } });
        if (!categoryDeparture) throw new Error("Category Departure not found");

        await models.master_category_departure.update({ category_name }, { where: { id }, transaction: t });
        await t.commit();
        return categoryDeparture();
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const nonActiveMasterCategoryDeparture = async (id) => {
    await models.master_category_departure.update({ is_active: false }, { where: { id } });
    const categoryDeactive = await models.master_category_departure.findOne({ where: { id } });
    return await categoryDeactive
};
const deleteMasterCategoryDeparture = async (id) => {
    return await models.master_category_departure.destroy({ where: { id } });
};

module.exports = {
    createMasterCategoryDeparture,
    getMasterCategoryDeparture,
    getMasterCategoryDepartureById,
    updateMasterCategoryDeparture,
    nonActiveMasterCategoryDeparture,
    deleteMasterCategoryDeparture
};
