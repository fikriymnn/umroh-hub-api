const models = require('../../models');
const sequelize = require('../../config/db');
const { hashPassword } = require('../../utils/hash');

const createMitra = async (data) => {
  const t = await sequelize.transaction();
  try {
    const {
      name, email, password, phone_number, address,
      compamy_name, website, nib, npwp, siup,
      siuppiu, akta, image_url
    } = data;

      // Cek apakah email sudah digunakan
    const existing = await models.Mitra.findOne({ where: { email } });
    if (existing) {
      await t.rollback();
      return { success: false, message: 'Email already in use' };
    }

    const hashed = await hashPassword(password);

    const newMitra = await models.Mitra.create({
      name,
      email,
      password: hashed,
      phone_number,
      address,
      company_name,
      website,
      nib,
      npwp,
      siup,
      siuppiu,
      akta,
      image_url,
      description,
      is_active: true,

    }, { transaction: t });

    await t.commit();

    return { success: true, message: 'Mitra created successfully', data: newMitra };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const getAllMitras = async () => {
  const mitras = await models.Mitra.findAll(
    {
      include: [
        {
          model: models.package_umroh,
          include: [
            {
              model: models.master_type_departure
            },
            {
              model: models.master_category_departure
            },
            {
              model: models.master_location_departure
            },
            {
              model: models.package_hotel,
              include: [
                {
                  model: models.master_hotel,
                  include: [
                    {
                      model: models.hotel_facilities
                    }
                  ]
                }
              ]
            },
            {
              model: models.package_facilities,
            },
            {
              model: models.package_schedule,
              include: [
                {
                  model: models.detail_activity
                }
              ]
            },
          ]
        }
      ]
    });
  return { success: true, message: 'All mitras fetched', data: mitras };
};

const getMitraById = async (id) => {
  const mitra = await models.Mitra.findOne(
    {
      where: { id: id },
      include: [
        {
          model: models.package_umroh,
          include: [
            {
              model: models.master_type_departure
            },
            {
              model: models.master_category_departure
            },
            {
              model: models.master_location_departure
            },
            {
              model: models.package_hotel,
              include: [
                {
                  model: models.master_hotel,
                  include: [
                    {
                      model: models.hotel_facilities
                    }
                  ]
                }
              ]
            },
            {
              model: models.package_facilities,
            },
            {
              model: models.package_schedule,
              include: [
                {
                  model: models.detail_activity
                }
              ]
            },
          ]
        }
      ]
    }
  );
  if (!mitra) return { success: false, message: 'Mitra not found' };
  return { success: true, message: 'Mitra fetched', data: mitra };
};

const updateMitra = async (id, data) => {
  const t = await sequelize.transaction();
  try {
    const mitra = await models.Mitra.findByPk(id);
    if (!mitra) return { success: false, message: 'Mitra not found' };

    await mitra.update(data, { transaction: t });
    await t.commit();
    return { success: true, message: 'Mitra updated successfully', data: mitra };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const reactivateMitra = async (id) => {
  const t = await sequelize.transaction();
  try {
    const mitra = await models.Mitra.findByPk(id);
    if (!mitra) return { success: false, message: 'Mitra not found' };

    if (mitra.is_active) return { success: false, message: 'Mitra is already active' };

    await mitra.update({ is_active: true }, { transaction: t });
    await t.commit();
    return { success: true, message: 'Mitra reactivated successfully', data: mitra };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};


const deactivateMitra = async (id) => {
  const t = await sequelize.transaction();
  try {
    const mitra = await models.Mitra.findByPk(id);
    if (!mitra) return { success: false, message: 'Mitra not found' };

    await mitra.update({ is_active: false }, { transaction: t });
    await t.commit();
    return { success: true, message: 'Mitra deactivated successfully', data: mitra };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const deleteMitra = async (id) => {
  const t = await sequelize.transaction();
  try {
    const mitra = await models.Mitra.findByPk(id);
    if (!mitra) return { success: false, message: 'Mitra not found' };

    await mitra.destroy({ transaction: t });
    await t.commit();
    return { success: true, message: 'Mitra deleted successfully' };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const getMitraMe = async (id) => {
  console.log(id);
  const mitra = await models.Mitra.findOne({ where: { id: id } });
  if (!mitra) {
    throw new Error('Mitra not found');
  }
  return mitra;
}

module.exports = {
  createMitra,
  getAllMitras,
  getMitraById,
  updateMitra,
  reactivateMitra,
  deactivateMitra,
  deleteMitra,
  getMitraMe
};
