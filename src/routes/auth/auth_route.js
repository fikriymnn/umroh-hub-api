const express = require('express');
const router = express.Router();
const { loginAdmin,loginUser,loginMitra, logoutController } = require('../../controllers/auth_controller');

router.post('/login/admin', loginAdmin); // login admin
router.post('/login/user', loginUser); // login user
router.post('/login/mitra', loginMitra); // login mitra
router.post('/logout', logoutController); // logout dummy

module.exports = router;
