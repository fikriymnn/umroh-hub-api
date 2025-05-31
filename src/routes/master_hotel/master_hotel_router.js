const express = require('express');
const router = express.Router();
const masterHotelController = require('../../controllers/master_hotel/master_hotel_controller');

router.post('/', masterHotelController.createHotel);
router.get('/', masterHotelController.getAllHotels);
router.get('/:id', masterHotelController.getHotelById);
router.put('/:id', masterHotelController.updateHotel);
router.patch('/deactivate/:id', masterHotelController.deactivateHotel);
router.delete('/:id', masterHotelController.deleteHotel);

module.exports = router;
