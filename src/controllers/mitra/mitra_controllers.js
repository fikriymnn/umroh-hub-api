const mitraService = require('../../services/mitra/mitra_service');

module.exports = {
  // CREATE
  async createMitra(req, res) {
    try {
      const newMitra = await mitraService.createMitra(req.body);

      
    if (!newMitra.success) {
      return res.status(400).json({
        status_code: 400,
        success: false,
        message: newMitra.message
      });
    }

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

  // REACTIVATE
async reactivateMitra(req, res) {
  try {
    const mitra = await mitraService.getMitraById(req.params.id);
    
    if (!mitra) {
      return res.status(404).json({
        status_code: 404,
        success: false,
        message: 'Mitra not found'
      });
    }

    if (mitra.is_active) {
      return res.status(200).json({
        status_code: 200,
        success: true,
        message: 'Mitra is already active'
      });
    }

    const reactivateMitra = await mitraService.reactivateMitra(req.params.id);

    res.status(200).json({
      status_code: 200,
      success: true,
      message: 'Mitra reactivated',
      data: reactivateMitra
    });

  } catch (err) {
    res.status(500).json({
      status_code: 500,
      success: false,
      error: err.message
    });
  }
},



async deactivateMitra(req, res) {
  try {
    const mitra = await mitraService.getMitraById(req.params.id); // pakai get dulu

    if (!mitra) {
      return res.status(404).json({
        status_code: 404,
        success: false,
        message: 'Mitra not found'
      });
    }

    if (!mitra.is_active) {
      return res.status(200).json({
        status_code: 200,
        success: true,
        message: 'Mitra is already deactivated'
      });
    }

    const updated = await mitraService.deactivateMitra(req.params.id);
    res.status(200).json({
      status_code: 200,
      success: true,
      message: 'Mitra deactivated',
      data: updated
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
  },

  async getMe(req, res) {
    const { id } = req.user;
    try {
      console.log(id);
      const mitra = await mitraService.getMitraMe(id);
      if (!mitra) {
        return res.status(404).json({
          status_code: 404,
          success: false,
          message: 'Mitra not found'
        });
      }
      return res.status(200).json({
        status_code: 200,
        success: true,
        data: mitra
      });
    } catch (err) {
      return res.status(500).json({
        status_code: 500,
        success: false,
        error: err.message
      });
    }
  }
};
