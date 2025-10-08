const express = require('express');
const { addPackageUmroh, getAllPackageUmroh, getOnePackageUmroh, editPackageUmroh, deletePackageUmroh, nonActivePackageUmroh, editStatusPackage, getAllPackageUmrohByMitra, rejectPackageUmroh, getOnePackageUmrohWithView, editStatusDeparture, konfirmationStatusPackageUmroh, addActualDateDeparurePackageUmroh } = require('../../controllers/package_umroh/package_umroh_controller');
const authenticate = require('../../middlewares/auth');
// const uploadPackage = require('../../middlewares/uploadPackageUmroh');
const router = express.Router();

router.post('/addPackage', authenticate(['mitra']), addPackageUmroh);
router.get('/getPackage', getAllPackageUmroh);
router.get('/getPackageView/:id', getOnePackageUmrohWithView);
router.get('/getOnePackageUmroh/:id', authenticate(['mitra', 'admin']), getOnePackageUmroh)
router.put('/editPackageUmroh/:id', authenticate(['mitra']), editPackageUmroh)
router.delete('/deletePackageUmroh/:id', authenticate(['mitra']), deletePackageUmroh)
router.put('/updateStatusPackage/:id', authenticate(['admin']), editStatusPackage)
router.put('/nonActivePackage/:id', authenticate(['mitra']), nonActivePackageUmroh)
router.get('/packageMitra', authenticate(['mitra']), getAllPackageUmrohByMitra)
router.put('/rejectPackage/:id', authenticate(['admin']), rejectPackageUmroh)
router.put('/editDepartureStatus/:id', authenticate(['mitra']), editStatusDeparture)
router.put('/konfirmationPackage/:id', authenticate(['admin']), konfirmationStatusPackageUmroh)
router.put('/actualDate/:id', authenticate(['mitra']), addActualDateDeparurePackageUmroh)

module.exports = router;
