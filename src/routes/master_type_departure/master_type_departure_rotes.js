const express = require("express");
const { addTypeDeparture, getAllTypeDeparture, getOneTypeDeparture, editTypeDeparture, nonActiveTypeDeparture, deleteTypeDeparture } = require("../../controllers/master_type_departure/master_type_departure_controllers");
const authenticate = require('../../middlewares/auth');
const router = express.Router();

router.post('/addType', authenticate(['admin']), addTypeDeparture)
router.get('/getAllType', getAllTypeDeparture)
router.get('/getOneType/:id', authenticate(['admin']), getOneTypeDeparture)
router.put('/editType/:id', authenticate(['admin']), editTypeDeparture)
router.put('/nonActiveType/:id', authenticate(['admin']), nonActiveTypeDeparture)
router.delete('/deleteType/:id', authenticate(['admin']), deleteTypeDeparture)

module.exports = router;