const { hashPassword } = require('../../utils/hash');
const models = require('../../models');
const sequelize = require('../../config/db');

module.exports = {
  async createUser(data) {
    const t = await sequelize.transaction();
    try {
      const { name, email, password, phone_number, address, no_ktp, image_url } = data;

      if (!name || !email || !password) {
        return { success: false, message: 'Name, email, and password are required' };
      }

      const hashed = await hashPassword(password);

      const user = await models.User.create({
        name,
        email,
        password: hashed,
        phone_number,
        address,
        no_ktp,
        image_url,
        is_active: true
      }, { transaction: t });

      await t.commit();
      return { success: true, message: 'User created successfully', data: user };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  async getAllUsers() {
    const users = await models.User.findAll();
    return { success: true, message: 'All users retrieved', data: users };
  },

  async getUserById(id) {
    const user = await models.User.findByPk(id);
    if (!user) return { success: false, message: 'User not found' };
    return { success: true, message: 'User retrieved', data: user };
  },

  async updateUser(id, data) {
    const t = await sequelize.transaction();
    try {
      const user = await models.User.findByPk(id);
      if (!user) return { success: false, message: 'User not found' };

      await user.update(data, { transaction: t });
      await t.commit();

      return { success: true, message: 'User updated successfully', data: user };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

 async reactivateUser (id) {
  const t = await sequelize.transaction();
  try {
    const user = await models.User.findByPk(id);
    if (!user) return { success: false, message: 'User not found' };

    if (user.is_active) return { success: false, message: 'User is already active' };

    await user.update({ is_active: true }, { transaction: t });
    await t.commit();
    return { success: true, message: 'User reactivated successfully', data: user };
  } catch (error) {
    await t.rollback();
    throw error;
  }
},


  async deactivateUser(id) {
    const t = await sequelize.transaction();
    try {
      const user = await models.User.findByPk(id);
      if (!user) return { success: false, message: 'User not found' };

      await user.update({ is_active: false }, { transaction: t });
      await t.commit();

      return { success: true, message: 'User deactivated', data: user };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  async deleteUser(id) {
    const t = await sequelize.transaction();
    try {
      const user = await models.User.findByPk(id);
      if (!user) return { success: false, message: 'User not found' };

      await user.destroy({ transaction: t });
      await t.commit();

      return { success: true, message: 'User deleted' };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  async getMe(id) {
    const user = await models.User.findByPk(id);
    if (!user) return { success: false, message: 'User not found' };
    return { success: true, message: 'User profile retrieved', data: user };
  }
};
