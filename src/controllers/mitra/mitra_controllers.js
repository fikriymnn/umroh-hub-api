const mitraService = require('../../services/mitra/mitra_service');

module.exports = {
  // CREATE
  async createMitra(req, res) {
    try {
      const newMitra = await mitraService.createMitra(req.body);
      res.status(201).json({
        status_code: 201,
        success: true,
        message: 'Mitra created',
        data: newMitra
      });
    } catch (err) {
      res.status(500).json({
        status_code: 500,
        success: false,
        error: err.message
      });
    }
  },

  // GET ALL
  async getAllMitras(req, res) {
    try {
      const mitras = await mitraService.getAllMitras();
      res.status(200).json({
        status_code: 200,
        success: true,
        message: 'Data retrieved',
        data: mitras
      });
    } catch (err) {
      res.status(500).json({
        status_code: 500,
        success: false,
        error: err.message
      });
    }
  },

  // GET BY ID
  async getMitraById(req, res) {
    try {
      const mitra = await mitraService.getMitraById(req.params.id);
      if (!mitra) {
        return res.status(404).json({
          status_code: 404,
          success: false,
          message: 'Mitra not found'
        });
      }
      res.status(200).json({
        status_code: 200,
        success: true,
        message: 'Data retrieved',
        data: mitra
      });
    } catch (err) {
      res.status(500).json({
        status_code: 500,
        success: false,
        error: err.message
      });
    }
  },

  // UPDATE
  async updateMitra(req, res) {
    try {
      if (req.file) {
        req.body.image_url = req.file.filename; // jika ada upload file
      }

      const mitra = await mitraService.updateMitra(req.params.id, req.body);
      if (!mitra) {
        return res.status(404).json({
          status_code: 404,
          success: false,
          message: 'Mitra not found'
        });
      }

      res.status(200).json({
        status_code: 200,
        success: true,
        message: 'Mitra updated',
        data: mitra
      });
    } catch (err) {
      res.status(500).json({
        status_code: 500,
        success: false,
        error: err.message
      });
    }
  },

  // DEACTIVATE
  async deactivateMitra(req, res) {
    try {
      const mitra = await mitraService.deactivateMitra(req.params.id);
      if (!mitra) {
        return res.status(404).json({
          status_code: 404,
          success: false,
          message: 'Mitra not found'
        });
      }

      res.status(200).json({
        status_code: 200,
        success: true,
        message: 'Mitra deactivated',
        data: mitra
      });
    } catch (err) {
      res.status(500).json({
        status_code: 500,
        success: false,
        error: err.message
      });
    }
  },

  // DELETE
  async deleteMitra(req, res) {
    try {
      const success = await mitraService.deleteMitra(req.params.id);
      if (!success) {
        return res.status(404).json({
          status_code: 404,
          success: false,
          message: 'Mitra not found'
        });
      }

      res.status(200).json({
        status_code: 200,
        success: true,
        message: 'Mitra deleted'
      });
    } catch (err) {
      res.status(500).json({
        status_code: 500,
        success: false,
        error: err.message
      });
    }
  }
};
