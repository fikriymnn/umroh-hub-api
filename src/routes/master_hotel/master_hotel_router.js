const express = require('express');
const router = express.Router();
const masterHotelController = require('../../controllers/master_hotel/master_hotel_controller');
const authenticate = require('../../middlewares/auth');

router.post('/', authenticate(['mitra']), masterHotelController.createHotel);
router.get('/', authenticate(['mitra']), masterHotelController.getAllHotels);
router.get('/:id', authenticate(['mitra']), masterHotelController.getHotelById);
router.put('/:id', authenticate(['mitra']), masterHotelController.updateHotel);
router.patch('/deactivate/:id', authenticate(['mitra']), masterHotelController.deactivateHotel);
router.delete('/:id', authenticate(['mitra']), masterHotelController.deleteHotel);

module.exports = router;
