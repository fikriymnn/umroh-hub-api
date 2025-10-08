const express = require("express");
const { addCategoryDeparture, getAllCategoryDeparture, getOneCategoryDeparture, editCategoryDeparture, nonActiveCategoryDeparture, deleteCategoryDeparture } = require("../../controllers/master_category_departure/master_category_departure_controllers");
const authenticate = require("../../middlewares/auth");
const router = express.Router();

// router.post('/addCategory', authenticate(['admin']), addCategoryDeparture)
router.post('/addCategory', authenticate(['admin']), addCategoryDeparture)
router.get('/getAllCategory', getAllCategoryDeparture)
router.get('/getOneCategory/:id', authenticate(['admin']), getOneCategoryDeparture)
router.put('/editCategory/:id', authenticate(['admin']), editCategoryDeparture)
router.put('/nonActiveCategory/:id', authenticate(['admin']), nonActiveCategoryDeparture)
router.delete('/deleteCategory/:id', authenticate(['admin']), deleteCategoryDeparture)

module.exports = router;