const { master_hotel, hotel_facilities, general_facilities } = require('../../models');
const sequelize = require('../../config/db');

module.exports = {
  async createHotel(data) {
    const t = await sequelize.transaction();
    try {
      const { id_mitra, hotel_name, hotel_type, room_type, address, facilities_general, facilities_hotel, image_url, description } = data;

      if (!id_mitra || !hotel_name || !hotel_type || !room_type || !address || !facilities_general || !facilities_hotel || !image_url || !description) {
        return { success: false, message: 'All fields are required' };
      }

      const newHotel = await master_hotel.create({
        id_mitra,
        hotel_name,
        hotel_type,
        room_type,
        address,
        image_url,
        description,
        is_active: true

      }, { transaction: t });

      if (facilities_hotel && facilities_hotel.length > 0) {
        for (const { description } of facilities_hotel) {
          await hotel_facilities.create({ id_hotel: newHotel.id, description }, { transaction: t });
        }
      }

      if (facilities_general && facilities_general.length > 0) {
        for (const { description } of facilities_general) {
          await general_facilities.create({ id_hotel: newHotel.id, description }, { transaction: t });
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
    const hotels = await master_hotel.findAll({ include: [{ model: hotel_facilities }, { model: general_facilities }] });
    return { success: true, message: 'All hotels retrieved', data: hotels };
  },

  async getHotelById(id) {
    const hotel = await master_hotel.findOne({ where: { id: id }, include: [{ model: hotel_facilities }, { model: general_facilities }] });
    if (!hotel) return { success: false, message: 'Hotel not found' };
    return { success: true, message: 'Hotel found', data: hotel };
  },

  async updateHotell(id, data) {
    const { hotel_name, hotel_type, room_type, address, facilities_general, facilities_hotel, image_url, description } = data;
    const t = await sequelize.transaction();
    try {
      const hotel = await master_hotel.findByPk(id);
      if (!hotel) return { success: false, message: 'Hotel not found' };

      await master_hotel.update({
        hotel_name,
        hotel_type,
        room_type,
        address,
        image_url,
        description,
        is_active: true

      }, { where: { id: hotel.id }, transaction: t });

      if (facilities_hotel && facilities_hotel.length > 0) {
        await hotel_facilities.destroy({ where: { id_hotel: hotel.id }, transaction: t });
        for (const { description } of facilities_hotel) {
          await hotel_facilities.create({ id_hotel: newHotel.id, description }, { transaction: t });
        }
      }

      if (facilities_general && facilities_general.length > 0) {
        await general_facilities.destroy({ where: { id_hotel: hotel.id }, transaction: t });
        for (const { description } of facilities_general) {
          await general_facilities.create({ id_hotel: newHotel.id, description }, { transaction: t });
        }
      }

      const hotelUpdate = await master_hotel.findByPk(id);
      await t.commit();
      return { success: true, message: 'Hotel update successfully', data: hotelUpdate };
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

  async getHotelByMitra(id) {
    return await master_hotel.findAll({
      where: { id_mitra: id },
      include: [
        {
          model: hotel_facilities
        },
        {
          model: general_facilities
        }
      ]
    });
  },

  async deleteHotel(id) {
    const t = await sequelize.transaction();
    try {
      const hotel = await master_hotel.findByPk(id);
      if (!hotel) return { success: false, message: 'Hotel not found' };

      await hotel.destroy({ transaction: t });
      await hotel_facilities.destroy({ where: { id_hotel: id }, transaction: t })
      await general_facilities.destroy({ where: { id_hotel: id }, transaction: t })
      await t.commit();
      return { success: true, message: 'Hotel deleted' };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
};
