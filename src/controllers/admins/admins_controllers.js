const adminService = require('../../services/admins/admin_service');

module.exports = {
  async createAdmin(req, res) {
    try {
      const newAdmin = await adminService.createAdmin(req.body);
      res.status(201).json(newAdmin);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getAllAdmins(req, res) {
    try {
      const admins = await adminService.getAllAdmins();
      res.json(admins);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getAdminById(req, res) {
    try {
      const admin = await adminService.getAdminById(req.params.id);
      if (!admin) return res.status(404).json({ message: 'Admin not found' });
      res.json(admin);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateAdmin(req, res) {
    try {
      const admin = await adminService.updateAdmin(req.params.id, req.body);
      if (!admin) return res.status(404).json({ message: 'Admin not found' });
      res.json(admin);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async deactivateAdmin(req, res) {
    try {
      const admin = await adminService.deactivateAdmin(req.params.id);
      if (!admin) return res.status(404).json({ message: 'Admin not found' });
      res.json({ message: 'Admin deactivated', admin });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async deleteAdmin(req, res) {
    try {
      const success = await adminService.deleteAdmin(req.params.id);
      if (!success) return res.status(404).json({ message: 'Admin not found' });
      res.json({ message: 'Admin deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
