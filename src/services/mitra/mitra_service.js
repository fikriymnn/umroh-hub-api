const { Mitra } = require('../../models');
const { hashPassword } = require('../../utils/hash');

module.exports = {
  async createMitra(data) {
    const {
      name, email, password, phone_number, address,
      compamy_name, website, nib, npwp, siup,
      siuppiu, akta, image_url
    } = data;

    const hashed = await hashPassword(password);
    return await Mitra.create({
      name,
      email,
      password: hashed,
      phone_number,
      address,
      compamy_name,
      website,
      nib,
      npwp,
      siup,
      siuppiu,
      akta,
      image_url,
      is_active: true
    });
  },

  async getAllMitras() {
    return await Mitra.findAll();
  },

  async getMitraById(id) {
    return await Mitra.findByPk(id);
  },

  async updateMitra(id, data) {
    const mitra = await Mitra.findByPk(id);
    if (!mitra) return null;
    await mitra.update(data);
    return mitra;
  },

  async deactivateMitra(id) {
    const mitra = await Mitra.findByPk(id);
    if (!mitra) return null;
    await mitra.update({ is_active: false });
    return mitra;
  },

  async deleteMitra(id) {
    const mitra = await Mitra.findByPk(id);
    if (!mitra) return null;
    await mitra.destroy();
    return true;
  }
};
