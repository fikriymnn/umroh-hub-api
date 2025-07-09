const hotelService = require('../../services/master_hotel/master_hotel_service');

module.exports = {
  async createHotel(req, res) {
    const { hotel_name, hotel_type, room_type, address, facilities_general, facilities_hotel, image_url, description } = req.body;
    const id_mitra = req.user.id;
    try {
      const result = await hotelService.createHotel({
        id_mitra,
        hotel_name,
        hotel_type,
        room_type,
        address,
        image_url,
        facilities_general,
        facilities_hotel,
        description
      });
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

  async getAllHotelByMitra(req, res) {
    const id = req.user.id;
    try {
      const result = await hotelService.getHotelByMitra(id);
      if (!result) return res.status(404).json({ success: false, message: 'Hotel not found' });
      res.json(result);
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async updateHotel(req, res) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: 'Request body cannot be empty' });
    }
    const { hotel_name, hotel_type, room_type, address, facilities_general, facilities_hotel, image_url, description } = req.body;
    try {
      const hotel = await hotelService.getHotelById(req.params.id)
      if (!hotel) {
        res.status(404).json({ status_code: 404, success: false, message: 'Hotel not found' })
      }

      const obj = {
        hotel_name: hotel_name ?? hotel.hotel_name,
        hotel_type: hotel_type ?? hotel.hotel_type,
        room_type: room_type ?? hotel.room_type,
        address: address ?? hotel.address,
        image_url: image_url ?? hotel.image_url,
        description: description ?? hotel.description,
        facilities_general,
        facilities_hotel
      };

      const isSame =
        hotel.hotel_name === obj.hotel_name &&
        hotel.hotel_type === obj.hotel_type &&
        hotel.room_type === obj.room_type &&
        hotel.address === obj.address &&
        hotel.image_url === obj.image_url &&
        hotel.description === obj.description &&
        (!facilities_general || facilities_general.length === 0) &&
        (!facilities_hotel || facilities_hotel.length === 0)

      if (isSame) {
        return res.status(200).json({
          status_code: 200,
          success: true,
          message: 'Tidak ada perubahan data'
        });
      }
      await hotelService.updateHotell(req.params.id, obj)
      const result = await hotelService.getHotelById(req.params.id)
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
