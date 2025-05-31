const express = require('express');
const { addPackageUmroh, getAllPackageUmroh, getOnePackageUmroh, editPackageUmroh, deletePackageUmroh } = require('../../controllers/package_umroh/package_umroh_controller');
const authenticate = require('../../middlewares/auth');
// const uploadPackage = require('../../middlewares/uploadPackageUmroh');
const router = express.Router();

router.post('/addPackage', authenticate(['mitra']), addPackageUmroh);
router.get('/getPackage', getAllPackageUmroh);
router.get('/getOnePackageUmroh/:id', getOnePackageUmroh)
router.put('/editPackageUmroh/:id', authenticate(['mitra']), editPackageUmroh)
router.delete('/deletePackageUmroh/:id', authenticate(['mitra']), deletePackageUmroh)

module.exports = router;
