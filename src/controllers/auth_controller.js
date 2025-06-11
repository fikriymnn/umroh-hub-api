const { User, Mitra, Admin } = require('../models');
const { comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/token');
require("dotenv").config();

module.exports = {
  // LOGIN ADMIN
  async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ where: { email } });

      if (!admin) {
        return res.status(404).json({
          status_code: 404,
          success: false,
          message: 'Email admin tidak ditemukan'
        });
      }

      const match = await comparePassword(password, admin.password);
      if (!match) {
        return res.status(401).json({
          status_code: 401,
          success: false,
          message: 'Password admin salah'
        });
      }

      if (!admin.is_active) {
        return res.status(403).json({
          status_code: 403,
          success: false,
          message: 'Akun admin tidak aktif'
        });
      }

      const token = generateToken({ id: admin.id, role: 'admin', username: admin.username });
      res.cookie('token', token, { httpOnly: true, sameSite: "None", secure: true, path: "/" });

      return res.status(200).json({
        status_code: 200,
        success: true,
        message: 'Login sebagai admin berhasil',
        data: { token }
      });
    } catch (err) {
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: 'Terjadi kesalahan saat login admin',
        error: err.message
      });
    }
  },

  // LOGIN MITRA
  async loginMitra(req, res) {
    try {
      const { email, password, name } = req.body;
      const mitra = await Mitra.findOne({ where: { email } });

      if (!mitra) {
        return res.status(404).json({
          status_code: 404,
          success: false,
          message: 'Email mitra tidak ditemukan'
        });
      }

      const mitraName = await Mitra.findOne({ where: { name } });

      if (!mitraName) {
        return res.status(404).json({
          status_code: 404,
          success: false,
          message: 'Nama mitra tidak ditemukan'
        });
      }

      const match = await comparePassword(password, mitra.password);
      if (!match) {
        return res.status(401).json({
          status_code: 401,
          success: false,
          message: 'Password mitra salah'
        });
      }

      if (!mitra.is_active) {
        return res.status(403).json({
          status_code: 403,
          success: false,
          message: 'Akun mitra tidak aktif'
        });
      }

      const token = generateToken({ id: mitra.id, role: 'mitra', username: mitra.username });
      res.cookie('token', token, { httpOnly: true, sameSite: "None", secure: true, path: "/" });

      return res.status(200).json({
        status_code: 200,
        success: true,
        message: 'Login sebagai mitra berhasil',
        data: token
      });
    } catch (err) {
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: 'Terjadi kesalahan saat login mitra',
        error: err.message
      });
    }
  },

  // LOGIN USER
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({
          status_code: 404,
          success: false,
          message: 'Email user tidak ditemukan'
        });
      }

      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(401).json({
          status_code: 401,
          success: false,
          message: 'Password user salah'
        });
      }

      if (!user.is_active) {
        return res.status(403).json({
          status_code: 403,
          success: false,
          message: 'Akun user tidak aktif'
        });
      }

      const token = generateToken({ id: user.id, role: 'user', username: user.username });
      res.cookie('token', token, { httpOnly: true, sameSite: "None", secure: true, path: "/" });

      return res.status(200).json({
        status_code: 200,
        success: true,
        message: 'Login sebagai user berhasil',
        data: token
      });
    } catch (err) {
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: 'Terjadi kesalahan saat login user',
        error: err.message
      });
    }
  },

  // LOGOUT
  async logoutController(req, res) {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      });

      return res.status(200).json({
        status_code: 200,
        success: true,
        message: 'Logout berhasil. Token dihapus.'
      });
    } catch (error) {
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: 'Terjadi kesalahan saat logout.',
        error: error.message
      });
    }
  }
};
