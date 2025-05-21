const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/upload');
const mitraController = require('../../controllers/mitra/mitra_controllers');

router.post('/', mitraController.createMitra);
router.get('/', mitraController.getAllMitras);
router.get('/:id', mitraController.getMitraById);
router.put('/:id', upload.single('image_url'),mitraController.updateMitra);
router.patch('/:id/deactivate', mitraController.deactivateMitra);
router.delete('/:id', mitraController.deleteMitra);

module.exports = router;
