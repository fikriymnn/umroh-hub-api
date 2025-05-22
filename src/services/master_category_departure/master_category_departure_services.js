// const models = require('../../models');

// const createMasterCategoryDeparture = async (data) => {
//     const { category_name } = data;
//     return await models.master_category_departure.create({ category_name });
// };

// const getMasterCategoryDeparture = async () => {
//     return await models.master_category_departure.findAll();
// };

// const getMasterCategoryDepartureById = async (id) => {
//     return await models.master_category_departure.findOne({ where: { id } });
// };

// const updateMasterCategoryDeparture = async (id, data) => {
//     const { category_name } = data;
//     await models.master_category_departure.update({ category_name }, { where: { id } });
//     const newCategory = await models.master_category_departure.findOne({ where: { id } });
//     return await newCategory
// };

// const nonActiveMasterCategoryDeparture = async (id) => {
//     await models.master_category_departure.update({ is_active: false }, { where: { id } });
//     const categoryDeactive = await models.master_category_departure.findOne({ where: { id } });
//     return await categoryDeactive
// };
// const deleteMasterCategoryDeparture = async (id) => {
//     return await models.master_category_departure.destroy({ where: { id } });
// };

// module.exports = {
//     createMasterCategoryDeparture,
//     getMasterCategoryDeparture,
//     getMasterCategoryDepartureById,
//     updateMasterCategoryDeparture,
//     nonActiveMasterCategoryDeparture,
//     deleteMasterCategoryDeparture
// };
