const { Admin } = require('../../models');
const { hashPassword } = require('../../utils/hash');

module.exports = {
  async createAdmin(data) {
    const { name, email, password, phone_number, address, image_url } = data;
    const hashed = await hashPassword(password);
    return await Admin.create({
      name,
      email,
      password: hashed,
      phone_number,
      address,
      image_url,
      is_active: true
    });
  },

  async getAllAdmins() {
    return await Admin.findAll();
  },

  async getAdminById(id) {
    return await Admin.findByPk(id);
  },

  async updateAdmin(id, data) {
    const admin = await Admin.findByPk(id);
    if (!admin) return null;
    await admin.update(data);
    return admin;
  },

  async deactivateAdmin(id) {
    const admin = await Admin.findByPk(id);
    if (!admin) return null;
    await admin.update({ is_active: false });
    return admin;
  },

  async deleteAdmin(id) {
    const admin = await Admin.findByPk(id);
    if (!admin) return null;
    await admin.destroy();
    return true;
  }
};
