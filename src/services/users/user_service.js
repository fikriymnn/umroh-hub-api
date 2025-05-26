// const { hashPassword } = require('../../utils/hash');
// const models = require('../../models'); // pastikan models/index.js return object dengan key `User`

// module.exports = {
//   async createUser(data) {
//     const { name, email, password, phone_number, address, no_ktp, image_url } = data;
//     const hashed = await hashPassword(password);
//     return await models.User.create({
//       name,
//       email,
//       password: hashed,
//       phone_number,
//       address,
//       no_ktp,
//       image_url,
//       is_active: true
//     });
//   },

//   async getAllUsers() {
//     return await models.User.findAll();
//   },

//   async getUserById(id) {
//     return await models.User.findByPk(id);
//   },

//   async updateUser(id, data) {
//     const user = await models.User.findByPk(id);
//     if (!user) return null;
//     await user.update(data);
//     return user;
//   },

//   async deactivateUser(id) {
//     const user = await models.User.findByPk(id);
//     if (!user) return null;
//     await user.update({ is_active: false });
//     return user;
//   },

<<<<<<< HEAD
//   async deleteUser(id) {
//     const user = await models.User.findByPk(id);
//     if (!user) return null;
//     await user.destroy();
//     return true;
//   }
// };
=======
  async deleteUser(id) {
    const user = await models.User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return true;
  },

  async getMe(id) {
    return await models.User.findByPk(id);
  }
};
>>>>>>> 9dcbdda345a95542b2ce894e156b0aa0c9cc10de
