const { where } = require("sequelize");
const models = require('../../models');
const sequelize = require("../../config/db");

const createReview = async (data) => {
    const {
        id_user,
        id_order,
        description,
        rating,
        images
    } = data;

    const t = await sequelize.transaction();
    try {
        const user = await models.User.findByPk(id_user);
        if (!user) throw new Error("User not found");

        const order = await models.order.findByPk(id_order);
        if (!order) throw new Error("Order not found");

        const packageUmroh = await models.package_umroh.findOne({ where: { id: order.id_package } });
        if (!packageUmroh) throw new Error("Package Umroh not found");

        const id_mitra = packageUmroh.id_mitra;

        const Review = await models.review.create({
            id_user,
            id_mitra,
            id_order,
            id_package: packageUmroh.id,
            description,
            rating,
            is_active: true
        }, { transaction: t });

        if (Array.isArray(images) && images.length > 0) {
            for (const { image_url } of images) {
                await models.review_image.create({
                    id_review: Review.id,
                    image_url,
                    is_active: true
                }, { transaction: t });
            }
        }

        await models.order.update({ review_status: true }, {
            where: { id: order.id },
            transaction: t
        });

        await t.commit();

        return await models.review.findOne({
            where: { id: Review.id },
            include: [{ model: models.review_image }]
        });

    } catch (error) {
        if (!t.finished) await t.rollback();
        throw error;
    }
};


const editReviews = async (id, data) => {
    const {
        description,
        rating,
        images
    } = data;
    const t = await sequelize.transaction();

    try {
        const Review = await models.review.findOne({
            where: { id: id },
            include: [{
                model: models.review_image,
            }]
        });
        if (!Review) throw new Error("Review not found");

        await models.review.update({
            description,
            rating,
        }, { where: { id: Review.id }, transaction: t });

        if (images && images.length > 0) {
            await models.review_image.destroy({ where: { id_review: Review.id }, transaction: t });
            for (const { image_url } of images) {
                await models.review_image.create({ id_review: Review.id, image_url }, { transaction: t });
            }
        }
        await t.commit();
        return Review;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const getReviewById = async (id) => {
    return await models.review.findOne({
        where: { id: id },
        include: [{
            model: models.review_image,
            // as: 'images'
        }]
    });
}

const getAllReview = async () => {
    return await models.review.findAll({
        include: [
            {
                model: models.review_image
            }, {
                model: models.User
            }
        ]
    })
}

const deleteReviewServices = async (id) => {
    await models.review.destroy({ where: { id: id } })
    await models.review_image.destroy({ where: { id_review: id } })
    return await models.order.destroy({ where: { id: id } });
};
module.exports = {
    createReview,
    deleteReviewServices,
    editReviews,
    getReviewById,
    getAllReview
}

