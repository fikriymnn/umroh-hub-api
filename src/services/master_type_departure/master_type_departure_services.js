const MasterTypeDeparture = require('../../models/master_type_departure');

const createMasterTypeDeparture = async (data) => {
    const { type_name } = data;
    return await MasterTypeDeparture.create({ type_name });
};

const getMasterTypeDeparture = async () => {
    return await MasterTypeDeparture.findAll();
};

const getMasterTypeDepartureById = async (id) => {
    return await MasterTypeDeparture.findOne({ where: { id } });
};

const updateMasterTypeDeparture = async (id, data) => {
    const { type_name } = data;
    await MasterTypeDeparture.update({ type_name }, { where: { id } });
    return await MasterTypeDeparture.findOne({ where: { id } });
};

const nonActiveMasterTypeDeparture = async (id) => {
    await MasterTypeDeparture.update({ is_active: false }, { where: { id } });
    return await MasterTypeDeparture.findOne({ where: { id } });
};
const deleteMasterTypeDeparture = async (id) => {
    return await MasterTypeDeparture.destroy({ where: { id } });
};

module.exports = {
    createMasterTypeDeparture,
    getMasterTypeDeparture,
    getMasterTypeDepartureById,
    updateMasterTypeDeparture,
    nonActiveMasterTypeDeparture,
    deleteMasterTypeDeparture
};
