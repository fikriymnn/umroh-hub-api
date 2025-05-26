const express = require("express");
const { addLocation, getAllLocation, getOneLocation, editLocation, nonActiveLocation, deleteLocation } = require("../../controllers/master_location/master_location_controllers");
const { authorizeRole } = require("../../middlewares/auth");
const router = express.Router();

router.post('/addLocation', authorizeRole('admin'), addLocation)
router.get('/getAllLocation', getAllLocation)
router.get('/getOneLocation/:id', getOneLocation)
router.put('/editLocation/:id', authorizeRole('admin'), editLocation)
router.put('/nonActiveLocation/:id', authorizeRole('admin'), nonActiveLocation)
router.delete('/deleteLocation/:id', authorizeRole('admin'), deleteLocation)

module.exports = router;