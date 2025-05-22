const { User, Mitra, Admin } = require('../models');
const { comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/token');

module.exports = {
  // LOGIN
  async loginController(req, res) {
    const { email, password } = req.body;

    const userTypes = [
      { model: Admin, role: 'admin' },
      { model: Mitra, role: 'mitra' },
      { model: User, role: 'user' },
    ];

    for (const userType of userTypes) {
      const user = await userType.model.findOne({ where: { email } });
      if (user && await comparePassword(password, user.password)) {
        if (!user.is_active) {
          return res.status(403).json({
            status_code: 403,
            success: false,
            message: 'Account not active'
          });
        }

        const token = generateToken({
          id: user.id,
          email: user.email,
          role: userType.role
        });

        return res.status(200).json({
          status_code: 200,
          success: true,
          message: `Login as ${userType.role} successful`,
          data: { token }
        });
      }
    }

    return res.status(401).json({
      status_code: 401,
      success: false,
      message: 'Invalid credentials'
    });
  },

  // LOGOUT
  async logoutController(req, res) {
    res.status(200).json({
      status_code: 200,
      success: true,
      message: 'Logout berhasil. Hapus token di client.'
    });
  }
};
