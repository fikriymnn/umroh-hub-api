const express = require('express');
const router = express.Router();
const { loginController, logoutController } = require('../../controllers/auth_controller');

router.post('/login', loginController);
router.post('/logout', logoutController); // logout dummy

module.exports = router;
