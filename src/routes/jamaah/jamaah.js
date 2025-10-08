const express = require("express");
const authenticate = require("../../middlewares/auth");
const { getAllJamaah, getJamaaById, getFilterJamaahToday, getStatisticJamaah } = require("../../controllers/jamaah/jamaah");
const router = express.Router();

router.get('/getJamaah', authenticate(['admin']), getAllJamaah)
router.get('/getJamaahById/:id', authenticate(['admin']), getJamaaById)
router.get('/getJamaahToday', authenticate(['admin']), getFilterJamaahToday)
router.get('/getJamaahStatistic', authenticate(['admin']), getStatisticJamaah)

module.exports = router;