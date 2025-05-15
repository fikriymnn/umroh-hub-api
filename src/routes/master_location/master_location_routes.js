const express = require("express");
const { addLocation, getAllLocation, getOneLocation, editLocation, nonActiveLocation, deleteLocation } = require("../../controllers/master_location/master_location_controllers");
const router = express.Router();

router.post('/addLocation', addLocation)
router.get('/getAllLocation', getAllLocation)
router.get('/getOneLocation/:id', getOneLocation)
router.put('/editLocation/:id', editLocation)
router.put('/nonActiveLocation/:id', nonActiveLocation)
router.delete('/deleteLocation/:id', deleteLocation)

module.exports = router;