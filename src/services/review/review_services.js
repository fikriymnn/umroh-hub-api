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

        const rating5 = await models.review.count({
            where: { id_package: packageUmroh.id, rating: '5' }
        })
        console.log(rating5);

        const rating4 = await models.review.count({
            where: { id_package: packageUmroh.id, rating: '4' }
        })
        console.log(rating4);

        const rating3 = await models.review.count({
            where: { id_package: packageUmroh.id, rating: '3' }
        })
        console.log(rating3);

        const rating2 = await models.review.count({
            where: { id_package: packageUmroh.id, rating: '2' }
        })
        console.log(rating2);

        const rating1 = await models.review.count({
            where: { id_package: packageUmroh.id, rating: '1' }
        })
        console.log(rating1);


        const totalView = await models.review.count({
            where: { id_package: packageUmroh.id }
        })

        const total5 = rating5 * 5;
        const total4 = rating4 * 4;
        const total3 = rating3 * 3;
        const total2 = rating2 * 2;
        const total1 = rating1 * 1;

        const totalRating = (total1 + total2 + total3 + total4 + total5) / totalView;

        console.log(totalRating);

        await models.package_umroh.update({ rating: totalRating }, {
            where: { id: packageUmroh.id },
            transaction: t
        })
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

