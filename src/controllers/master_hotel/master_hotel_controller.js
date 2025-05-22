const hotelService = require('../../services/master_hotel/master_hotel_service');

module.exports = {
  async createHotel(req, res) {
    try {
      const result = await hotelService.createHotel(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  async getAllHotels(req, res) {
    try {
      const result = await hotelService.getAllHotels();
      res.json(result);
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getHotelById(req, res) {
    try {
      const result = await hotelService.getHotelById(req.params.id);
      if (!result) return res.status(404).json({ success: false, message: 'Hotel not found' });
      res.json(result);
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async updateHotel(req, res) {
    try {
      const result = await hotelService.updateHotel(req.params.id, req.body);
      if (!result) return res.status(404).json({ success: false, message: 'Hotel not found' });
      res.json(result);
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  async deactivateHotel(req, res) {
    try {
      const result = await hotelService.deactivateHotel(req.params.id);
      if (!result) return res.status(404).json({ success: false, message: 'Hotel not found' });
      res.json(result);
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async deleteHotel(req, res) {
    try {
      const result = await hotelService.deleteHotel(req.params.id);
      if (!result) return res.status(404).json({ success: false, message: 'Hotel not found' });
      res.json(result);
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};
