const { createReview, getReviewById, deleteReviewServices, editReviews, getAllReview } = require("../../services/review/review_services");

const addReview = async (req, res) => {
    const {
        id_order,
        description,
        rating,
        images
    } = req.body;
    const id_user = req.user.id
    if (
        !id_order
        || !description
        || !rating
        //    || !images
    ) {
        return res.status(400).json({
            status_code: 400,
            success: false,
            message: "Incomplete data. Please fill in all required fields."
        });
    }
    try {
        const Review = await createReview({
            id_user,
            id_order,
            description,
            rating,
            images
        });

        return res.status(200).json({ status_code: 200, success: true, message: 'Review created successfully', Review });
    } catch (error) {
        return res.status(500).json({ status_code: 500, success: false, message: error.message });
    }
};

const editReview = async (req, res) => {
    const {
        description,
        rating,
        images
    } = req.body;
    try {
        const Review = await getReviewById(req.params.id)
        if (!Review) {
            res.status(404).json({ status_code: 404, success: false, message: 'Review not found' })
        }

        const obj = {
            description: description ?? Review.description,
            rating: rating ?? Review.rating,
            images,
        };

        const isSame =
            Review.description === obj.description &&
            Review.rating === obj.rating &&
            (!images || images.length === 0);

        if (isSame) {
            return res.status(200).json({
                status_code: 200,
                success: true,
                message: 'Tidak ada perubahan data'
            });
        }
        await editReviews(req.params.id, obj)
        res.status(200).json({ status_code: 200, success: true, data: Review })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getAllReviewPackage = async (req, res) => {
    try {
        const Review = await getAllReview()
        res.status(200).json({ status_code: 200, success: true, data: Review })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const deleteReview = async (req, res) => {
    try {
        const Review = await getReviewById(req.params.id);

        if (!Review) {
            return res.status(404).json({
                status_code: 404,
                success: false,
                message: 'Review not found'
            });
        }

        await deleteReviewServices(req.params.id);

        return res.status(200).json({
            status_code: 200,
            success: true,
            data: Review
        });

    } catch (error) {
        console.error('Delete error:', error);

        return res.status(500).json({
            status_code: 500,
            success: false,
            message: error?.message || 'Internal Server Error'
        });
    }
};

module.exports = {
    addReview,
    editReview,
    deleteReview,
    getAllReviewPackage
}