const express = require("express");
const { addTypeDeparture, getAllTypeDeparture, getOneTypeDeparture, editTypeDeparture, nonActiveTypeDeparture, deleteTypeDeparture } = require("../../controllers/master_type_departure/master_type_departure_controllers");
const { authorizeRole } = require("../../middlewares/auth");
const router = express.Router();

router.post('/addType', authorizeRole('admin'), addTypeDeparture)
router.get('/getAllType', getAllTypeDeparture)
router.get('/getOneType/:id', getOneTypeDeparture)
router.put('/editType/:id', authorizeRole('admin'), editTypeDeparture)
router.put('/nonActiveType/:id', authorizeRole('admin'), nonActiveTypeDeparture)
router.delete('/deleteType/:id', authorizeRole('admin'), deleteTypeDeparture)

module.exports = router;