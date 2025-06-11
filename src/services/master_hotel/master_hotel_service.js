const { master_hotel, hotel_facilities } = require('../../models');
const sequelize = require('../../config/db');

module.exports = {
  async createHotel(data) {
    const t = await sequelize.transaction();
    try {
      const { id_mitra, hotel_name, hotel_type, room_type, address, facilities } = data;

      if (!id_mitra || !hotel_name || !hotel_type || !room_type || !address || !facilities) {
        return { success: false, message: 'All fields are required' };
      }

      const newHotel = await master_hotel.create({
        id_mitra,
        hotel_name,
        hotel_type,
        room_type,
        address,
        is_active: true
      }, { transaction: t });

      if (facilities && facilities.length > 0) {
        for (const { description } of facilities) {
          await hotel_facilities.create({ id_hotel: newHotel.id, description }, { transaction: t });
        }
      }

      await t.commit();
      return { success: true, message: 'Hotel created successfully', data: newHotel };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  async getAllHotels() {
    const hotels = await master_hotel.findAll();
    return { success: true, message: 'All hotels retrieved', data: hotels };
  },

  async getHotelById(id) {
    const hotel = await master_hotel.findByPk(id);
    if (!hotel) return { success: false, message: 'Hotel not found' };
    return { success: true, message: 'Hotel found', data: hotel };
  },

  async updateHotel(id, data) {
    const t = await sequelize.transaction();
    try {
      const hotel = await master_hotel.findByPk(id);
      if (!hotel) return { success: false, message: 'Hotel not found' };

      await hotel.update(data, { transaction: t });
      await t.commit();
      return { success: true, message: 'Hotel updated successfully', data: hotel };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  async deactivateHotel(id) {
    const t = await sequelize.transaction();
    try {
      const hotel = await master_hotel.findByPk(id);
      if (!hotel) return { success: false, message: 'Hotel not found' };

      await hotel.update({ is_active: false }, { transaction: t });
      await t.commit();
      return { success: true, message: 'Hotel deactivated', data: hotel };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  async deleteHotel(id) {
    const t = await sequelize.transaction();
    try {
      const hotel = await master_hotel.findByPk(id);
      if (!hotel) return { success: false, message: 'Hotel not found' };

      await hotel.destroy({ transaction: t });
      await t.commit();
      return { success: true, message: 'Hotel deleted' };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
};
