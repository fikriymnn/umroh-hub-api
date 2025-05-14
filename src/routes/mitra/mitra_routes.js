const express = require('express');
const router = express.Router();
const mitraController = require('../../controllers/mitra/mitra_controllers');

router.post('/', mitraController.createMitra);
router.get('/', mitraController.getAllMitras);
router.get('/:id', mitraController.getMitraById);
router.put('/:id', mitraController.updateMitra);
router.patch('/:id/deactivate', mitraController.deactivateMitra);
router.delete('/:id', mitraController.deleteMitra);

module.exports = router;
