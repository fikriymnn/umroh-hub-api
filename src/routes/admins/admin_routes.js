const express = require('express');
const router = express.Router();
// const upload = require('../../middlewares/upload');
const adminController = require('../../controllers/admins/admins_controllers');
const authenticate = require('../../middlewares/auth');


router.post('/register', adminController.registerAdmin);

// Login dan Logout
router.post('/login', adminController.loginAdmin);
router.post('/logout', authenticate(['admin']), adminController.logoutAdmin);

router.get('/',adminController.getAllAdmins);
router.get('/:id',adminController.getAdminById);
router.put('/:id',adminController.updateAdmin);
router.patch('/:id/deactivate', adminController.deactivateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
