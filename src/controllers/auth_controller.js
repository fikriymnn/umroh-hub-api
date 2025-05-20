const { User, Mitra, Admin } = require('../models');
const { comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/token');

module.exports = {
  async loginController(req, res) {
    const { email, password } = req.body;

    // Coba cari user di semua jenis
    const userTypes = [
      { model: Admin, role: 'admin' },
      { model: Mitra, role: 'mitra' },
      { model: User, role: 'user' },
    ];

    for (const userType of userTypes) {
      const user = await userType.model.findOne({ where: { email } });
      if (user && await comparePassword(password, user.password)) {
        if (!user.is_active) {
          return res.status(403).json({ message: 'Account not active' });
        }

        const token = generateToken({
          id: user.id,
          email: user.email,
          role: userType.role
        });

        return res.json({ message: `Login as ${userType.role} successful`, token });
      }
    }

    res.status(401).json({ message: 'Invalid credentials' });
  },


  // Logout dummy (karena JWT sifatnya stateless)
  async logoutController(req, res) {
    // Di sisi frontend, cukup hapus token
    res.json({ message: 'Logout berhasil. Hapus token di client.' })
  }
};


