const express = require("express");
const { addCategoryDeparture, getAllCategoryDeparture, getOneCategoryDeparture, editCategoryDeparture, nonActiveCategoryDeparture, deleteCategoryDeparture } = require("../../controllers/master_category_departure/master_category_departure_controllers");
const { authorizeRole } = require("../../middlewares/auth");
const router = express.Router();

router.post('/addCategory', authorizeRole('admin'), addCategoryDeparture)
router.get('/getAllCategory', getAllCategoryDeparture)
router.get('/getOneCategory/:id', getOneCategoryDeparture)
router.put('/editCategory/:id', authorizeRole('admin'), editCategoryDeparture)
router.put('/nonActiveCategory/:id', authorizeRole('admin'), nonActiveCategoryDeparture)
router.delete('/deleteCategory/:id', authorizeRole('admin'), deleteCategoryDeparture)

module.exports = router;