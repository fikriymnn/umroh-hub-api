// const models = require('../../models');

// const createMasterTypeDeparture = async (data) => {
//     const { type_name } = data;
//     return await models.master_type_departure.create({ type_name });
// };

// const getMasterTypeDeparture = async () => {
//     return await models.master_type_departure.findAll();
// };

// const getMasterTypeDepartureById = async (id) => {
//     return await models.master_type_departure.findOne({ where: { id } });
// };

// const updateMasterTypeDeparture = async (id, data) => {
//     const { type_name } = data;
//     await models.master_type_departure.update({ type_name }, { where: { id } });
//     return await models.master_type_departure.findOne({ where: { id } });
// };

// const nonActiveMasterTypeDeparture = async (id) => {
//     await models.master_type_departure.update({ is_active: false }, { where: { id } });
//     return await models.master_type_departure.findOne({ where: { id } });
// };
// const deleteMasterTypeDeparture = async (id) => {
//     return await models.master_type_departure.destroy({ where: { id } });
// };

// module.exports = {
//     createMasterTypeDeparture,
//     getMasterTypeDeparture,
//     getMasterTypeDepartureById,
//     updateMasterTypeDeparture,
//     nonActiveMasterTypeDeparture,
//     deleteMasterTypeDeparture
// };
