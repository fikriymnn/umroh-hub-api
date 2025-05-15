const express = require("express");
const { addCategoryDeparture, getAllCategoryDeparture, getOneCategoryDeparture, editCategoryDeparture, nonActiveCategoryDeparture, deleteCategoryDeparture } = require("../../controllers/master_category_departure/master_category_departure_controllers");
const router = express.Router();

router.post('/addCategory', addCategoryDeparture)
router.get('/getAllCategory', getAllCategoryDeparture)
router.get('/getOneCategory/:id', getOneCategoryDeparture)
router.put('/editCategory/:id', editCategoryDeparture)
router.put('/nonActiveCategory/:id', nonActiveCategoryDeparture)
router.delete('/deleteCategory/:id', deleteCategoryDeparture)

module.exports = router;