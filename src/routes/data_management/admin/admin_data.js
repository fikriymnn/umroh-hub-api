const express = require("express");
const authenticate = require("../../../middlewares/auth");
const { getDataDashboardAdmin, getDataPackageOrderdAdmin, getDataStatisticAdmin } = require("../../../controllers/data_manajemen/admin/admin_data");
const router = express.Router();

router.get('/getDataDashboardAdmin', authenticate(['admin']), getDataDashboardAdmin)
router.get('/getDataPresentaseAdmin', authenticate(['admin']), getDataPackageOrderdAdmin)
router.get('/getDataStatisticAdmin', authenticate(['admin']), getDataStatisticAdmin)
// h3aifahapahanifahhhhh
module.exports = router;