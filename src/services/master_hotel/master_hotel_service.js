const { master_hotel } = require('../../models');

module.exports = {
  async createHotel(data) {
    const { id_mitra, hotel_name, hotel_type, room_type, address } = data;

    if (!id_mitra || !hotel_name || !hotel_type || !room_type || !address) {
      throw new Error('All fields are required');
    }

    const newHotel = await master_hotel.create({
      id_mitra,
      hotel_name,
      hotel_type,
      room_type,
      address,
      is_active: true
    });

    return { success: true, message: 'Hotel created successfully', data: newHotel };
  },

  async getAllHotels() {
    const hotels = await master_hotel.findAll();
    return { success: true, message: 'All hotels retrieved', data: hotels };
  },

  async getHotelById(id) {
    const hotel = await master_hotel.findByPk(id);
    if (!hotel) return null;
    return { success: true, message: 'Hotel found', data: hotel };
  },

  async updateHotel(id, data) {
    const hotel = await master_hotel.findByPk(id);
    if (!hotel) return null;

    await hotel.update(data);
    return { success: true, message: 'Hotel updated successfully', data: hotel };
  },

  async deactivateHotel(id) {
    const hotel = await master_hotel.findByPk(id);
    if (!hotel) return null;

    hotel.is_active = false;
    await hotel.save();

    return { success: true, message: 'Hotel deactivated', data: hotel };
  },

  async deleteHotel(id) {
    const hotel = await master_hotel.findByPk(id);
    if (!hotel) return null;

    await hotel.destroy();
    return { success: true, message: 'Hotel deleted' };
  }
};
