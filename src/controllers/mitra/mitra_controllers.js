const mitraService = require('../../services/mitra/mitra_service');

module.exports = {
  async createMitra(req, res) {
    try {
      const newMitra = await mitraService.createMitra(req.body);
      res.status(201).json(newMitra);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getAllMitras(req, res) {
    try {
      const mitras = await mitraService.getAllMitras();
      res.json(mitras);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getMitraById(req, res) {
    try {
      const mitra = await mitraService.getMitraById(req.params.id);
      if (!mitra) return res.status(404).json({ message: 'Mitra not found' });
      res.json(mitra);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateMitra(req, res) {
    try {
      const mitra = await mitraService.updateMitra(req.params.id, req.body);
      if (!mitra) return res.status(404).json({ message: 'Mitra not found' });
      res.json(mitra);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async deactivateMitra(req, res) {
    try {
      const mitra = await mitraService.deactivateMitra(req.params.id);
      if (!mitra) return res.status(404).json({ message: 'Mitra not found' });
      res.json({ message: 'Mitra deactivated', mitra });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async deleteMitra(req, res) {
    try {
      const success = await mitraService.deleteMitra(req.params.id);
      if (!success) return res.status(404).json({ message: 'Mitra not found' });
      res.json({ message: 'Mitra deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
