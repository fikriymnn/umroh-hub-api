const express = require('express');
const authenticate = require('../../middlewares/auth');
const { addReview, editReview, deleteReview, getAllReviewPackage } = require('../../controllers/review/review_controller');
const router = express.Router();

router.post('/addReview', authenticate(['user']), addReview);
router.put('/editReview/:id', authenticate(['user']), editReview)
router.delete('/deleteReview/:id', authenticate(['mitra', 'user']), deleteReview)
router.get('/getAllReview', getAllReviewPackage)

module.exports = router;
