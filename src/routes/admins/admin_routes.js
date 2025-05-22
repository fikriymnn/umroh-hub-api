const express = require('express');
const router = express.Router();
// const upload = require('../../middlewares/upload');
const adminController = require('../../controllers/admins/admins_controllers');
const { authenticate, authorizeRole } = require('../../middlewares/auth');


router.post('/register', adminController.registerAdmin);

// Login dan Logout
router.post('/login', adminController.loginAdmin);
router.post('/logout', adminController.logoutAdmin);

router.get('/', authenticate, authorizeRole('admin'),adminController.getAllAdmins);
router.get('/:id', authenticate, authorizeRole('admin'),adminController.getAdminById);
router.put('/:id', authenticate, authorizeRole('admin'),adminController.updateAdmin);
router.patch('/:id/deactivate',authenticate, authorizeRole('admin'), adminController.deactivateAdmin);
router.delete('/:id',authenticate, authorizeRole('admin'), adminController.deleteAdmin);

module.exports = router;
