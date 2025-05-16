const { User } = require('../models');
const { comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/token');

async function login(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Email tidak ditemukan');

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error('Password salah');

  if (!user.is_active) throw new Error('Akun tidak aktif');

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role || 'user' // jika pakai role
  });

  return { user, token };
}

module.exports = {
  login
};
