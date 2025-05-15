const MasterLocation = require('../../models/master_location');

const createMasterLocation = async (data) => {
    const { location_name } = data;
    return await MasterLocation.create({ location_name });
};

const getMasterLocation = async () => {
    return await MasterLocation.findAll();
};

const getMasterLocationById = async (id) => {
    return await MasterLocation.findOne({ where: { id } });
};

const updateMasterLocation = async (id, data) => {
    const { location_name } = data;
    await MasterLocation.update({ location_name }, { where: { id } });
    return await MasterLocation.findOne({ where: { id } });
};

const nonActiveMasterLocation = async (id) => {
    await MasterLocation.update({ is_active: false }, { where: { id } });
    return await MasterLocation.findOne({ where: { id } });
};
const deleteMasterLocation = async (id) => {
    return await MasterLocation.destroy({ where: { id } });
};

module.exports = {
    createMasterLocation,
    getMasterLocation,
    getMasterLocationById,
    updateMasterLocation,
    nonActiveMasterLocation,
    deleteMasterLocation
};
