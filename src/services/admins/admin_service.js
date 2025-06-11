const models = require('../../models');
const sequelize = require('../../config/db');
const { hashPassword } = require('../../utils/hash');

const createAdmin = async (data) => {
  const t = await sequelize.transaction();
  try {
    const { name, email, password, phone_number, address, image_url } = data;
    const hashed = await hashPassword(password);

    const newAdmin = await models.Admin.create({
      name,
      email,
      password: hashed,
      phone_number,
      address,
      image_url,
      is_active: true,
    }, { transaction: t });

    await t.commit();
    return { success: true, message: 'Admin created successfully', data: newAdmin };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const getAllAdmins = async () => {
  const admins = await models.Admin.findAll();
  return { success: true, message: 'All admins fetched', data: admins };
};

const getAdminById = async (id) => {
  const admin = await models.Admin.findByPk(id);
  if (!admin) return { success: false, message: 'Admin not found' };
  return { success: true, message: 'Admin fetched', data: admin };
};

const updateAdmin = async (id, data) => {
  const t = await sequelize.transaction();
  try {
    const admin = await models.Admin.findByPk(id);
    if (!admin) return { success: false, message: 'Admin not found' };

    await admin.update(data, { transaction: t });
    await t.commit();
    return { success: true, message: 'Admin updated successfully', data: admin };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};


const reactivateAdmin = async (id) => {
  const t = await sequelize.transaction();
  try {
    const admin = await models.Admin.findByPk(id);
    if (!admin) return { success: false, message: 'Admin not found' };

    if (admin.is_active) return { success: false, message: 'Admin is already active' };

    await admin.update({ is_active: true }, { transaction: t });
    await t.commit();
    return { success: true, message: 'Admin reactivated successfully', data: admin };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const deactivateAdmin = async (id) => {
  const t = await sequelize.transaction();
  try {
    const admin = await models.Admin.findByPk(id);
    if (!admin) return { success: false, message: 'Admin not found' };

    await admin.update({ is_active: false }, { transaction: t });
    await t.commit();
    return { success: true, message: 'Admin deactivated successfully', data: admin };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const deleteAdmin = async (id) => {
  const t = await sequelize.transaction();
  try {
    const admin = await models.Admin.findByPk(id);
    if (!admin) return { success: false, message: 'Admin not found' };

    await admin.destroy({ transaction: t });
    await t.commit();
    return { success: true, message: 'Admin deleted successfully' };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const getAdminMe = async (id) => {
  console.log(id);
  const admin = await models.Admin.findOne({ where: { id: id } });
  if (!admin) {
    throw new Error('Admin not found');
  }
  return admin;
}
module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  reactivateAdmin,
  deactivateAdmin,
  deleteAdmin,
  getAdminMe
};
