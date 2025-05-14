const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admins/admins_controllers');

router.post('/', adminController.createAdmin);
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);
router.put('/:id', adminController.updateAdmin);
router.patch('/:id/deactivate', adminController.deactivateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
