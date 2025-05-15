const express = require("express");
const { addTypeDeparture, getAllTypeDeparture, getOneTypeDeparture, editTypeDeparture, nonActiveTypeDeparture, deleteTypeDeparture } = require("../../controllers/master_type_departure/master_type_departure_controllers");
const router = express.Router();

router.post('/addType', addTypeDeparture)
router.get('/getAllType', getAllTypeDeparture)
router.get('/getOneType/:id', getOneTypeDeparture)
router.put('/editType/:id', editTypeDeparture)
router.put('/nonActiveType/:id', nonActiveTypeDeparture)
router.delete('/deleteType/:id', deleteTypeDeparture)

module.exports = router;