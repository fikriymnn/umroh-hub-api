const express = require('express');
const { addPackageUmroh } = require('../../controllers/package_umroh/package_umroh_controller');
const router = express.Router();

router.post('/addPackage', addPackageUmroh);

module.exports = router;
