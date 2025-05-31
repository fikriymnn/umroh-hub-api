// const models = require('../../models');

// const createMasterLocation = async (data) => {
//     const { location_name } = data;
//     return await models.master_location_departure.create({ location_name });
// };

// const getMasterLocation = async () => {
//     return await models.master_location_departure.findAll();
// };

// const getMasterLocationById = async (id) => {
//     return await models.master_location_departure.findOne({ where: { id } });
// };

// const updateMasterLocation = async (id, data) => {
//     const { location_name } = data;
//     await models.master_location_departure.update({ location_name }, { where: { id } });
//     return await models.master_location_departure.findOne({ where: { id } });
// };

// const nonActiveMasterLocation = async (id) => {
//     await models.master_location_departure.update({ is_active: false }, { where: { id } });
//     return await models.master_location_departure.findOne({ where: { id } });
// };
// const deleteMasterLocation = async (id) => {
//     return await models.master_location_departure.destroy({ where: { id } });
// };

// module.exports = {
//     createMasterLocation,
//     getMasterLocation,
//     getMasterLocationById,
//     updateMasterLocation,
//     nonActiveMasterLocation,
//     deleteMasterLocation
// };
