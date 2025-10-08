const express = require("express");
const { addLocation, getAllLocation, getOneLocation, editLocation, nonActiveLocation, deleteLocation } = require("../../controllers/master_location/master_location_controllers");
const authenticate = require('../../middlewares/auth');
const router = express.Router();

router.post('/addLocation', authenticate(['admin']), addLocation)
router.get('/getAllLocation', getAllLocation)
router.get('/getOneLocation/:id', authenticate(['admin']), getOneLocation)
router.put('/editLocation/:id', authenticate(['admin']), editLocation)
router.put('/nonActiveLocation/:id', authenticate(['admin']), nonActiveLocation)
router.delete('/deleteLocation/:id', authenticate(['admin']), deleteLocation)

module.exports = router;