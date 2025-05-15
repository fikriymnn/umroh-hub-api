const MasterCategoryDeparture = require('../../models/master_category_departure');

const createMasterCategoryDeparture = async (data) => {
    const { category_name } = data;
    return await MasterCategoryDeparture.create({ category_name });
};

const getMasterCategoryDeparture = async () => {
    return await MasterCategoryDeparture.findAll();
};

const getMasterCategoryDepartureById = async (id) => {
    return await MasterCategoryDeparture.findOne({ where: { id } });
};

const updateMasterCategoryDeparture = async (id, data) => {
    const { category_name } = data;
    await MasterCategoryDeparture.update({ category_name }, { where: { id } });
    return await MasterCategoryDeparture.findOne({ where: { id } });
};

const nonActiveMasterCategoryDeparture = async (id) => {
    await MasterCategoryDeparture.update({ is_active: false }, { where: { id } });
    return await MasterCategoryDeparture.findOne({ where: { id } });
};
const deleteMasterCategoryDeparture = async (id) => {
    return await MasterCategoryDeparture.destroy({ where: { id } });
};

module.exports = {
    createMasterCategoryDeparture,
    getMasterCategoryDeparture,
    getMasterCategoryDepartureById,
    updateMasterCategoryDeparture,
    nonActiveMasterCategoryDeparture,
    deleteMasterCategoryDeparture
};
