const { User } = require('../../models');
const { hashPassword } = require('../../utils/hash');

module.exports = {
  async createUser(data) {
    const { name, email, password, phone_number, address, no_ktp, image_url } = data;
    const hashed = await hashPassword(password);
    return await User.create({
      name,
      email,
      password: hashed,
      phone_number,
      address,
      no_ktp,
      image_url,
      is_active: true
    });
  },

  async getAllUsers() {
    return await User.findAll();
  },

  async getUserById(id) {
    return await User.findByPk(id);
  },

  async updateUser(id, data) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(data);
    return user;
  },

  async deactivateUser(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update({ is_active: false });
    return user;
  },

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return true;
  }
};
